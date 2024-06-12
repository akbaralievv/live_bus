import { ReactElement, useEffect, useMemo, useState, ChangeEvent } from 'react';
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  LinearProgress,
  Stack,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material';
import { DataGrid, GridApi, GridColDef, GridSlots, useGridApiRef } from '@mui/x-data-grid';
import IconifyIcon from 'components/base/IconifyIcon';
import { databases } from 'libs/appwrite';
import { debounce } from 'lodash';
import { ID } from 'appwrite';
import CustomPagination from 'components/sections/dashboard/Home/Sales/TopSellingProduct/CustomPagination';
import { drawerWidth } from 'layouts/main-layout';

interface Seat {
  $id: string;
  seat_number: string;
  status: string;
}

const Seats = (): ReactElement => {
  const apiRef = useGridApiRef<GridApi>();
  const [search, setSearch] = useState('');
  const [seats, setSeats] = useState<Seat[]>([]);
  const [editingSeat, setEditingSeat] = useState<Seat | null>(null);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await databases.listDocuments('database', 'seats_economy');
        setSeats(response.documents as unknown as Seat[]);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchSeats();
  }, []);

  const handleGridSearch = useMemo(() => {
    return debounce((searchValue) => {
      apiRef.current.setQuickFilterValues(
        searchValue.split(' ').filter((word: string) => word !== ''),
      );
    }, 250);
  }, [apiRef]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.currentTarget.value;
    setSearch(searchValue);
    handleGridSearch(searchValue);
  };

  const handleCreate = () => {
    setEditingSeat({
      $id: '',
      seat_number: '',
      status: '',
    });
  };

  const handleEdit = (seat: Seat) => {
    setEditingSeat(seat);
  };

  const handleDelete = async (id: string) => {
    try {
      await databases.deleteDocument('database', 'seats_economy', id);
      setSeats((prevSeats) => prevSeats.filter((seat) => seat.$id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSave = async (seat: Seat) => {
    try {
      const { $id, ...data } = seat;

      if ($id) {
        await databases.updateDocument('database', 'seats_economy', $id, {
          seat_number: data.seat_number,
          status: data.status,
        });
        setSeats((prevSeats) => prevSeats.map((s) => (s.$id === $id ? { ...s, ...data } : s)));
      } else {
        const response = await databases.createDocument(
          'database',
          'seats_economy',
          ID.unique(),
          data,
        );
        setSeats((prevSeats) => [...prevSeats, response as unknown as Seat]);
      }
      setEditingSeat(null);
    } catch (error) {
      console.log(error.message);
    }
  };

  const columns: GridColDef[] = [
    { field: 'seat_number', headerName: 'Seat Number', flex: 1, minWidth: 150 },
    { field: 'status', headerName: 'Status', flex: 1, minWidth: 150 },
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
    <Grid
      container
      component="main"
      columns={12}
      spacing={3.75}
      flexGrow={1}
      pt={4.375}
      pr={1.875}
      pb={0}
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        pl: { xs: 3.75, lg: 0 },
      }}
    >
      <Grid xs={12} lg={8} pl={4.875}>
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
              Места
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
              Create Seat
            </Button>
          </Stack>
          <Divider />
          <Stack height={1}>
            <DataGrid
              apiRef={apiRef}
              columns={columns}
              rows={seats}
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
                noRowsOverlay: () => <section>No seats available</section>,
              }}
              sx={{
                height: 1,
                width: 1,
              }}
            />
          </Stack>
          {editingSeat && (
            <Dialog open={Boolean(editingSeat)} onClose={() => setEditingSeat(null)}>
              <DialogTitle>{editingSeat.$id ? 'Edit Seat' : 'Create Seat'}</DialogTitle>
              <DialogContent>
                <TextField
                  margin="dense"
                  label="Seat Number"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={editingSeat.seat_number}
                  onChange={(e) => setEditingSeat({ ...editingSeat, seat_number: e.target.value })}
                />
                <TextField
                  margin="dense"
                  label="Status"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={editingSeat.status}
                  onChange={(e) => setEditingSeat({ ...editingSeat, status: e.target.value })}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setEditingSeat(null)}>Cancel</Button>
                <Button onClick={() => handleSave(editingSeat)}>Save</Button>
              </DialogActions>
            </Dialog>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Seats;
