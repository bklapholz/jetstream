/** @jsx jsx */
import { jsx } from '@emotion/core';
import { DATE_FORMATS } from '@jetstream/shared/constants';
import { formatNumber } from '@jetstream/shared/ui-utils';
import { InsertUpdateUpsertDelete, SalesforceOrgUi, SalesforceOrgUiType } from '@jetstream/types';
import { Badge, Checkbox, ConfirmationModalPromise, Input, Radio, RadioGroup, Select } from '@jetstream/ui';
import { isNumber } from 'lodash';
import startCase from 'lodash/startCase';
import { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import LoadRecordsResults from '../components/load-results/LoadRecordsResults';
import { ApiMode, FieldMapping } from '../load-records-types';

const MAX_BULK = 10000;
const MAX_BATCH = 200;
const MAX_API_CALLS = 250;

function getMaxBatchSize(apiMode: ApiMode) {
  if (apiMode === 'BATCH') {
    return MAX_BATCH;
  } else {
    return MAX_BULK;
  }
}

function getBatchSizeExceededError(numApiCalls: number): string {
  return (
    `Either your batch size is too low or you are loading in too many records. ` +
    `Your configuration would require ${formatNumber(numApiCalls)} calls to Salesforce, which exceeds the limit of ${MAX_API_CALLS}. ` +
    `Increase your batch size or reduce the number of records in your file.`
  );
}

export interface LoadRecordsPerformLoadProps {
  selectedOrg: SalesforceOrgUi;
  orgType: SalesforceOrgUiType;
  selectedSObject: string;
  loadType: InsertUpdateUpsertDelete;
  fieldMapping: FieldMapping;
  inputFileData: any[];
  externalId?: string;
  onIsLoading: (isLoading: boolean) => void;
}

export const LoadRecordsPerformLoad: FunctionComponent<LoadRecordsPerformLoadProps> = ({
  selectedOrg,
  orgType,
  selectedSObject,
  loadType,
  fieldMapping,
  inputFileData,
  externalId,
  onIsLoading,
}) => {
  const [loadNumber, setLoadNumber] = useState<number>(0);
  const [apiMode, setApiMode] = useState<ApiMode>('BULK');
  const [batchSize, setBatchSize] = useState<number>(MAX_BULK);
  const [batchSizeError, setBatchSizeError] = useState<string>(null);
  const [insertNulls, setInsertNulls] = useState<boolean>(false);
  const [serialMode, setSerialMode] = useState<boolean>(false);
  const [dateFormat, setDateFormat] = useState<string>(DATE_FORMATS.MM_DD_YYYY);
  const [batchApiLimitError, setBatchApiLimitError] = useState<string>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadInProgress, setLoadInProgress] = useState<boolean>(false);
  const [hasLoadResults, setHasLoadResults] = useState<boolean>(false);
  const loadTypeLabel = startCase(loadType.toLowerCase());
  const numRecordsImpactedLabel = formatNumber(inputFileData.length);

  // ensure that the Batch API does not consume an huge amount of API calls
  useEffect(() => {
    if (inputFileData.length && batchSize && inputFileData.length / batchSize > MAX_API_CALLS) {
      setBatchApiLimitError(getBatchSizeExceededError(Math.round(inputFileData.length / batchSize)));
    } else if (batchApiLimitError) {
      setBatchApiLimitError(null);
    }
  }, [batchSize, inputFileData.length, batchApiLimitError]);

  useEffect(() => {
    setBatchSize(getMaxBatchSize(apiMode));
    if (hasLoadResults) {
      setHasLoadResults(false);
    }
    if (apiMode === 'BATCH' && !serialMode) {
      setSerialMode(true);
    } else if (apiMode === 'BULK' && serialMode) {
      setSerialMode(false);
    }
  }, [apiMode]);

  useEffect(() => {
    if (!isNumber(batchSize) || batchSize <= 0 || batchSize > getMaxBatchSize(apiMode)) {
      setBatchSizeError(`The batch size must be between 1 and ${getMaxBatchSize(apiMode)}`);
    } else if (batchSizeError) {
      setBatchSizeError(null);
    }
  }, [batchSize, apiMode, batchSizeError]);

  function handleBatchSize(event: ChangeEvent<HTMLInputElement>) {
    const value = Number.parseInt(event.target.value);
    if (Number.isInteger(value)) {
      setBatchSize(value);
    } else if (!event.target.value) {
      setBatchSize(null);
    }
  }

  function handleDateFormatChange(event: ChangeEvent<HTMLSelectElement>) {
    setDateFormat(event.target.value);
  }

  async function handleStartLoad() {
    if (
      loadNumber === 0 ||
      (await ConfirmationModalPromise({
        content: 'This file has already been loaded, are you sure you want to load it again?',
      }))
    ) {
      setLoadNumber(loadNumber + 1);
      setLoading(true);
      setLoadInProgress(true);
      setHasLoadResults(false);
      onIsLoading(true);
    }
  }

  function handleFinishLoad() {
    setLoading(false);
    setHasLoadResults(true);
    setLoadInProgress(false);
    onIsLoading(false);
  }

  function hasDataInputError(): boolean {
    return !!batchSizeError || !!batchApiLimitError;
  }

  /**
   * TODO:
   * limit batch api based on number of records and batch size (maybe limit to 50 or 100 api calls total)?
   */

  return (
    <div>
      <h1 className="slds-text-heading_medium">Options</h1>
      <div className="slds-p-around_small">
        <RadioGroup
          className="slds-m-bottom_xx-small"
          idPrefix="apiMode"
          label="Api Mode"
          required
          labelHelp="The Bulk API is optimized for loading in large datasets and you can view the progress within Salesforce. The Batch API will load records in sets of up to 200 at a time and cannot be used with large datasets."
        >
          <Radio
            idPrefix="apiMode"
            id="apiMode-bulk"
            name="BULK"
            label="Bulk API"
            value="BULK"
            checked={apiMode === 'BULK'}
            disabled={loading}
            onChange={setApiMode as (value: string) => void}
          />
          <Radio
            idPrefix="apiMode"
            id="apiMode-batch"
            name="BATCH"
            label="Batch API"
            value="BATCH"
            checked={apiMode === 'BATCH'}
            disabled={loading}
            onChange={setApiMode as (value: string) => void}
          />
        </RadioGroup>
        <Checkbox
          id={'insert-null-values'}
          checked={insertNulls}
          label={'Insert Null Values'}
          labelHelp="Select this option to clear any mapped fields where the field is blank in your file."
          disabled={loading}
          onChange={setInsertNulls}
        />

        <Checkbox
          id={'serial-mode'}
          checked={serialMode}
          label={'Serial Mode'}
          labelHelp="Serial mode processes the batches one-by-one instead of parallel. The Batch API always processes data in serial mode."
          disabled={loading || apiMode !== 'BULK'}
          onChange={setSerialMode}
        />

        <Input
          label="Batch Size"
          isRequired={true}
          hasError={!!batchSizeError || !!batchApiLimitError}
          errorMessageId="batch-size-error"
          errorMessage={batchSizeError || batchApiLimitError}
          labelHelp="The batch size determines how many records will be processed together."
        >
          <input
            id="batch-size"
            className="slds-input"
            placeholder="Set batch size"
            value={batchSize || ''}
            aria-describedby={batchSizeError}
            disabled={loading}
            onChange={handleBatchSize}
          />
        </Input>

        <Select
          id={'date-format'}
          label={'Date Format'}
          labelHelp="Specify the format of any date fields in your file. Jetstream just needs to know the order of the month and the day and will auto-detect the exact format."
        >
          <select
            aria-describedby="date-format"
            className="slds-select"
            id="date-format-select"
            required
            value={dateFormat}
            disabled={loading}
            onChange={handleDateFormatChange}
          >
            <option value={DATE_FORMATS.MM_DD_YYYY}>{DATE_FORMATS.MM_DD_YYYY}</option>
            <option value={DATE_FORMATS.DD_MM_YYYY}>{DATE_FORMATS.DD_MM_YYYY}</option>
            <option value={DATE_FORMATS.YYYY_MM_DD}>{DATE_FORMATS.YYYY_MM_DD}</option>
          </select>
        </Select>
      </div>
      <h1 className="slds-text-heading_medium">Summary</h1>
      <div className="slds-p-around_small">
        <div>
          <Badge type={orgType === 'Production' ? 'warning' : 'light'} title={orgType}>
            {orgType}
          </Badge>
          <strong className="slds-m-left_xx-small">{selectedOrg.username}</strong>
        </div>
        <div className="slds-m-top_small">
          <button className="slds-button slds-button_brand" disabled={hasDataInputError() || loadInProgress} onClick={handleStartLoad}>
            {loadTypeLabel} <strong className="slds-m-horizontal_xx-small">{numRecordsImpactedLabel}</strong> Records
          </button>
        </div>
      </div>
      <h1 className="slds-text-heading_medium">Results</h1>
      <div className="slds-p-around_small">
        {(loadInProgress || hasLoadResults) && (
          <LoadRecordsResults
            key={loadNumber}
            selectedOrg={selectedOrg}
            selectedSObject={selectedSObject}
            fieldMapping={fieldMapping}
            inputFileData={inputFileData}
            apiMode={apiMode}
            loadType={loadType}
            externalId={externalId}
            batchSize={batchSize}
            insertNulls={insertNulls}
            serialMode={serialMode}
            dateFormat={dateFormat}
            onFinish={handleFinishLoad}
          />
        )}
      </div>
    </div>
  );
};

export default LoadRecordsPerformLoad;