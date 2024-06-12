import { ChangeEvent, ReactElement, useEffect, useMemo, useState } from 'react';
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputAdornment,
  LinearProgress,
  Link,
  Stack,
  TextField,
  Tooltip,
  Typography,
  debounce,
} from '@mui/material';
import { DataGrid, GridApi, GridColDef, GridSlots, useGridApiRef } from '@mui/x-data-grid';
import IconifyIcon from 'components/base/IconifyIcon';
import CustomPagination from './CustomPagination';
import { databases } from 'libs/appwrite';
import { ID } from 'appwrite';
import { TicketForm } from 'components/form/TicketForm';

interface Ticket {
  $id: string;
  from: string;
  to: string;
  fromDate: string;
  fromTime: string;
  toDate: string;
  toTime: string;
  price: string;
}

const TopSellingProduct = (): ReactElement => {
  const apiRef = useGridApiRef<GridApi>();
  const [search, setSearch] = useState('');
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await databases.listDocuments('database', 'tickets');
        setTickets(response.documents as unknown as Ticket[]);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchTickets();
  }, []);

  const handleGridSearch = useMemo(() => {
    return debounce((searchValue) => {
      apiRef.current.setQuickFilterValues(
        searchValue.split(' ').filter((word: any) => word !== ''),
      );
    }, 250);
  }, [apiRef]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.currentTarget.value;
    setSearch(searchValue);
    handleGridSearch(searchValue);
  };

  const handleCreate = () => {
    setEditingTicket({
      $id: '',
      from: '',
      to: '',
      fromDate: '',
      fromTime: '',
      toDate: '',
      toTime: '',
      price: '',
    });
  };

  const handleEdit = (ticket: Ticket) => {
    setEditingTicket(ticket);
  };

  const handleDelete = async (id: string) => {
    try {
      await databases.deleteDocument('database', 'tickets', id);
      setTickets((prevTickets) => prevTickets.filter((ticket) => ticket.$id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSave = async (ticket: Ticket) => {
    try {
      const { $id, ...data } = ticket;

      if ($id) {
        await databases.updateDocument('database', 'tickets', $id, {
          from: ticket.from,
          fromDate: ticket.fromDate,
          fromTime: ticket.fromTime,
          price: ticket.price,
          to: ticket.to,
          toDate: ticket.toDate,
          toTime: ticket.toTime,
        });
        setTickets((prevTickets) =>
          prevTickets.map((t) => (t.$id === $id ? { ...t, ...data } : t)),
        );
      } else {
        const response = await databases.createDocument(
          'database',
          'tickets',
          ID.unique(),
          data,
          [],
        );
        setTickets((prevTickets) => [...prevTickets, response as unknown as Ticket]);
      }
      setEditingTicket(null);
    } catch (error) {
      console.log(error.message);
    }
  };

  const columns: GridColDef<Ticket>[] = [
    { field: 'from', headerName: 'From', flex: 1, minWidth: 150 },
    { field: 'to', headerName: 'To', flex: 1, minWidth: 150 },
    { field: 'fromDate', headerName: 'From Date', flex: 1, minWidth: 150 },
    { field: 'fromTime', headerName: 'From Time', flex: 1, minWidth: 150 },
    { field: 'toDate', headerName: 'To Date', flex: 1, minWidth: 150 },
    { field: 'toTime', headerName: 'To Time', flex: 1, minWidth: 150 },
    { field: 'typeBus', headerName: 'Type Bus', flex: 1, minWidth: 100 },
    { field: 'price', headerName: 'Price', flex: 1, minWidth: 100 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 0.5,
      minWidth: 100,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <IconButton onClick={() => handleEdit(params.row)} sx={{ color: 'orange' }}>
            <IconifyIcon icon="mdi:pencil" width={20} height={20} />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.$id)} sx={{ color: 'orange' }}>
            <IconifyIcon icon="mdi:delete" width={20} height={20} />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <Stack
      bgcolor="background.paper"
      borderRadius={5}
      width={1}
      boxShadow={(theme) => theme.shadows[4]}
      height={1}
    >
      <Stack
        direction={{ sm: 'row' }}
        justifyContent="space-between"
        alignItems="center"
        padding={3.75}
        gap={3.75}
      >
        <Typography variant="h5" color="text.primary">
          Билеты
        </Typography>
        <TextField
          variant="filled"
          placeholder="Search..."
          id="search-input"
          name="table-search-input"
          onChange={handleChange}
          value={search}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={{ width: 24, height: 24 }}>
                <IconifyIcon icon="mdi:search" width={1} height={1} />
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" onClick={handleCreate}>
          Create Ticket
        </Button>
      </Stack>
      <Divider />
      <Stack height={1}>
        <DataGrid
          apiRef={apiRef}
          columns={columns}
          rows={tickets}
          getRowId={(row) => row.$id}
          getRowHeight={() => 70}
          hideFooterSelectedRowCount
          disableColumnResize
          disableColumnSelector
          disableRowSelectionOnClick
          rowSelection={false}
          initialState={{
            pagination: { paginationModel: { pageSize: 5, page: 0 } },
            columns: {
              columnVisibilityModel: {
                id: false,
              },
            },
          }}
          pageSizeOptions={[5]}
          onResize={() => {
            apiRef.current.autosizeColumns({
              includeOutliers: true,
              expand: true,
            });
          }}
          slots={{
            loadingOverlay: LinearProgress as GridSlots['loadingOverlay'],
            pagination: CustomPagination,
            noRowsOverlay: () => <section>No tickets available</section>,
          }}
          sx={{
            height: 1,
            width: 1,
          }}
        />
      </Stack>
      {editingTicket && (
        <TicketForm
          ticket={editingTicket}
          onSave={handleSave}
          onCancel={() => setEditingTicket(null)}
        />
      )}
    </Stack>
  );
};

export default TopSellingProduct;
