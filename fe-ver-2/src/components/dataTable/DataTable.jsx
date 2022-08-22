import React from 'react'
import './dataTable.scss'

import { DataGrid} from '@mui/x-data-grid';
import {userColumns, userRows} from '../../datauser.js'


const DataTable = () => {

    const actionColumn = [
        {field:"action", headerName: "Action", width: 200, renderCell: () => (
            <div className='cellAction'>
                <div className="viewButton">View</div>
                <div className="deleteButton">Delete</div>
            </div>
        )}
    ]

    return (
        <div className='datatable'>
            <DataGrid
                rows={userRows}
                columns={userColumns.concat(actionColumn)}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    )
}

export default DataTable