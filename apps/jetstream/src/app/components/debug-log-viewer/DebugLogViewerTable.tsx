/** @jsx jsx */
import { ColDef, ICellRendererParams, SelectionChangedEvent } from '@ag-grid-community/core';
import { css, jsx } from '@emotion/react';
import { ApexLog, ApexLogWithViewed } from '@jetstream/types';
import { AutoFullHeightContainer, DataTable, Icon } from '@jetstream/ui';
import { dataTableDateFormatter, dataTableFileSizeFormatter, DateFilterComparator } from 'libs/ui/src/lib/data-table/data-table-utils';
import { FunctionComponent, useEffect, useRef } from 'react';

export const LogViewedRenderer: FunctionComponent<ICellRendererParams> = ({ node }) => {
  if (node.data?.viewed) {
    return (
      <Icon
        css={css`
          margin-left: -7px;
        `}
        type="utility"
        icon="preview"
        className="slds-icon slds-icon-text-default slds-icon_xx-small"
        title="You have previously viewed this log"
        description="This log has been viewed"
      />
    );
  }
  return null;
};

const COLUMNS: ColDef[] = [
  {
    headerName: '',
    colId: 'viewed',
    field: 'viewed',
    width: 24,
    cellRenderer: 'logViewedRenderer',
  },
  {
    headerName: 'User',
    colId: 'user',
    field: 'LogUser.Name',
    width: 125,
  },
  {
    headerName: 'Application',
    colId: 'Application',
    field: 'Application',
    width: 125,
  },
  {
    headerName: 'Operation',
    colId: 'Operation',
    field: 'Operation',
    width: 125,
  },
  {
    headerName: 'Status',
    colId: 'Status',
    field: 'Status',
    width: 125,
  },
  {
    headerName: 'Size',
    colId: 'Size',
    field: 'LogLength',
    width: 125,
    valueFormatter: dataTableFileSizeFormatter,
  },
  {
    headerName: 'Time',
    colId: 'LastModifiedDate',
    field: 'LastModifiedDate',
    sort: 'desc',
    width: 202,
    valueFormatter: dataTableDateFormatter,
    getQuickFilterText: dataTableDateFormatter,
    filter: 'agDateColumnFilter',
    filterParams: {
      comparator: DateFilterComparator,
    },
  },
];

function getRowNodeId({ Id }: ApexLog): string {
  return Id;
}

export interface DebugLogViewerTableProps {
  logs: ApexLogWithViewed[];
  onRowSelection: (log: ApexLog) => void;
}

export const DebugLogViewerTable: FunctionComponent<DebugLogViewerTableProps> = ({ logs, onRowSelection }) => {
  const isMounted = useRef(null);

  useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);

  function handleSelectionChanged(event: SelectionChangedEvent) {
    const selectedRow: ApexLog = event.api.getSelectedRows()[0];
    if (selectedRow) {
      onRowSelection(selectedRow);
    }
  }

  return (
    <AutoFullHeightContainer fillHeight setHeightAttr bottomBuffer={75}>
      <DataTable
        columns={COLUMNS}
        data={logs}
        agGridProps={{
          immutableData: true,
          getRowNodeId,
          suppressCellSelection: true,
          headerHeight: 25,
          frameworkComponents: { logViewedRenderer: LogViewedRenderer },
          gridOptions: {
            rowSelection: 'single',
            defaultColDef: {
              filter: true,
              sortable: true,
              resizable: true,
            },
          },
          onSelectionChanged: handleSelectionChanged,
        }}
      />
    </AutoFullHeightContainer>
  );
};

export default DebugLogViewerTable;