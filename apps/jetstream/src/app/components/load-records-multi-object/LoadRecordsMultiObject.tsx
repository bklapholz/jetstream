/** @jsx jsx */
import { jsx } from '@emotion/react';
import { ANALYTICS_KEYS, DATE_FORMATS, INPUT_ACCEPT_FILETYPES } from '@jetstream/shared/constants';
import { useNonInitialEffect } from '@jetstream/shared/ui-utils';
import { InputReadFileContent, SalesforceOrgUi } from '@jetstream/types';
import {
  AutoFullHeightContainer,
  Checkbox,
  EmptyState,
  FileSelector,
  Grid,
  Icon,
  OpenRoadIllustration,
  Page,
  PageHeader,
  PageHeaderActions,
  PageHeaderRow,
  PageHeaderTitle,
  ScopedNotification,
  Select,
  Spinner,
} from '@jetstream/ui';
import { ChangeEvent, FunctionComponent, useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import * as XLSX from 'xlsx';
import { applicationCookieState, selectedOrgState, selectedOrgType } from '../../app-state';
import { useAmplitude } from '../core/analytics';
import { LoadMultiObjectRequestWithResult } from './load-records-multi-object-types';
import LoadRecordsMultiObjectErrors from './LoadRecordsMultiObjectErrors';
import LoadRecordsMultiObjectResults from './LoadRecordsMultiObjectResults';
import useLoadFile from './useLoadFile';
import useProcessLoadFile from './useProcessLoadFile';

const TEMPLATE_DOWNLOAD_LINK = 'https://drive.google.com/u/0/uc?id=1pOCPCoX4SxQWfdGc5IFa0wjXX_BKrBcV&export=download';
const HEIGHT_BUFFER = 170;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LoadRecordsMultiObjectProps {}

export const LoadRecordsMultiObject: FunctionComponent<LoadRecordsMultiObjectProps> = () => {
  const isMounted = useRef(null);
  const { trackEvent } = useAmplitude();
  const selectedOrg = useRecoilValue<SalesforceOrgUi>(selectedOrgState);
  const orgType = useRecoilValue(selectedOrgType);

  const [inputFilename, setInputFilename] = useState<string>();
  const [inputFileData, setInputFileData] = useState<XLSX.WorkBook>();
  const [{ defaultApiVersion }] = useRecoilState(applicationCookieState);
  const [templateUrl] = useState(`${TEMPLATE_DOWNLOAD_LINK}`);
  const [insertNulls, setInsertNulls] = useState(false);
  const [dateFormat, setDateFormat] = useState<string>(DATE_FORMATS.MM_DD_YYYY);
  const [loadStarted, setLoadStarted] = useState(false);
  const {
    processFile,
    reset: fileProcessingReset,
    data: fileProcessingData,
    errors: fileProcessingErrors,
    loading: fileProcessingLoading,
  } = useProcessLoadFile(selectedOrg, defaultApiVersion, { dateFormat, insertNulls });
  const { loadFile, reset: loadResultsReset, data: loadResultsData, loading: dataLoadLoading } = useLoadFile(
    selectedOrg,
    defaultApiVersion
  );

  const [data, setData] = useState<LoadMultiObjectRequestWithResult[]>();

  useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);

  useNonInitialEffect(() => {
    handleStartOver();
  }, [selectedOrg]);

  // prefer loadResultsData if it is set, otherwise use fileProcessingData
  // It is all the same data, but loadResultsData clones the data as it is being processed and adds results
  useEffect(() => {
    setData(loadResultsData || fileProcessingData);
  }, [fileProcessingData, loadResultsData]);

  useNonInitialEffect(() => {
    if (inputFileData) {
      processFile(inputFileData);
    }
  }, [inputFileData]);

  function handleDateFormatChange(event: ChangeEvent<HTMLSelectElement>) {
    setDateFormat(event.target.value);
  }

  function handleFile({ content, filename }: InputReadFileContent) {
    setLoadStarted(false);
    const workbook = XLSX.read(content, { cellText: false, cellDates: true, type: 'array' });
    setInputFilename(filename);
    setInputFileData(workbook);
    fileProcessingReset();
    loadResultsReset();
  }

  function handleLoadStarted() {
    setLoadStarted(true);
    loadFile(data);
  }

  function handleStartOver() {
    setLoadStarted(false);
    setInputFilename(null);
    fileProcessingReset();
    loadResultsReset();
    trackEvent(ANALYTICS_KEYS.load_StartOver);
  }

  return (
    <Page>
      <PageHeader>
        <PageHeaderRow>
          <PageHeaderTitle icon={{ type: 'standard', icon: 'data_streams' }} label="Load Records to Multiple Objects" />
          <PageHeaderActions colType="actions" buttonType="separate">
            <button
              className="slds-button slds-button_neutral"
              disabled={fileProcessingLoading || dataLoadLoading}
              onClick={() => handleStartOver()}
            >
              <Icon type="utility" icon="refresh" className="slds-button__icon slds-button__icon_left" />
              Start Over
            </button>
          </PageHeaderActions>
        </PageHeaderRow>
      </PageHeader>
      <AutoFullHeightContainer className="slds-p-horizontal_x-small slds-scrollable_none" bufferIfNotRendered={HEIGHT_BUFFER}>
        {fileProcessingLoading && <Spinner />}
        <ScopedNotification theme="light" className="slds-m-top_x-small">
          <p>
            Download the{' '}
            <a href={`${templateUrl}`} target="_blank">
              Excel template
            </a>{' '}
            to get started.
          </p>
        </ScopedNotification>

        {/* TODO: re-process file I guess if these are changed after file selection? */}
        <Grid>
          <fieldset className="slds-form-element slds-m-around_small">
            <legend className="slds-form-element__legend slds-form-element__label">Load Options</legend>
            <Checkbox
              id={'insert-null-values'}
              checked={insertNulls}
              label={'Insert Null Values'}
              labelHelp="Select this option to clear any mapped fields where the field is blank in your file. This only applies to record updates."
              disabled={loadStarted || fileProcessingLoading}
              onChange={setInsertNulls}
            />

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
                disabled={loadStarted || fileProcessingLoading}
                onChange={handleDateFormatChange}
              >
                <option value={DATE_FORMATS.MM_DD_YYYY}>{DATE_FORMATS.MM_DD_YYYY}</option>
                <option value={DATE_FORMATS.DD_MM_YYYY}>{DATE_FORMATS.DD_MM_YYYY}</option>
                <option value={DATE_FORMATS.YYYY_MM_DD}>{DATE_FORMATS.YYYY_MM_DD}</option>
              </select>
            </Select>
            <FileSelector
              id="upload-load-template"
              className="slds-m-top_small"
              label="Data File (Excel File)"
              filename={inputFilename}
              accept={[INPUT_ACCEPT_FILETYPES.EXCEL]}
              userHelpText="Choose an Excel file that is in the correct format from the provided template."
              disabled={fileProcessingLoading || dataLoadLoading}
              onReadFile={handleFile}
            ></FileSelector>
          </fieldset>
        </Grid>

        {!data && !fileProcessingErrors?.length && (
          <div>
            <EmptyState headline="Load a file to continue" illustration={<OpenRoadIllustration />}>
              <p>
                Download the{' '}
                <a href={`${templateUrl}`} target="_blank">
                  Excel template
                </a>{' '}
                to get started.
              </p>
            </EmptyState>
            ;
          </div>
        )}
        {/* TODO: what if there are no rows in any of the loaded data? */}
        {fileProcessingErrors?.length > 0 && <LoadRecordsMultiObjectErrors errors={fileProcessingErrors} />}
        {data?.length > 0 && (
          <LoadRecordsMultiObjectResults
            selectedOrg={selectedOrg}
            orgType={orgType}
            data={data}
            loading={dataLoadLoading}
            loadFinished={loadResultsData && !dataLoadLoading}
            onLoadStarted={handleLoadStarted}
          />
        )}
      </AutoFullHeightContainer>
    </Page>
  );
};

export default LoadRecordsMultiObject;