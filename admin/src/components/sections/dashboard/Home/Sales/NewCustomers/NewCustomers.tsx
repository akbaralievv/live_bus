import { ReactElement, useEffect, useMemo, useState, MouseEvent, ChangeEvent } from 'react';
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
} from '@mui/material';
import { DataGrid, GridApi, GridColDef, GridSlots, useGridApiRef } from '@mui/x-data-grid';
import IconifyIcon from 'components/base/IconifyIcon';
import { databases } from 'libs/appwrite';
import { debounce } from 'lodash';
import { ID } from 'appwrite';
import CustomPagination from '../TopSellingProduct/CustomPagination';

interface Route {
  $id: string;
  name: string;
  description: string;
  stops: string[];
}

const NewCustomers = (): ReactElement => {
  const apiRef = useGridApiRef<GridApi>();
  const [search, setSearch] = useState('');
  const [routes, setRoutes] = useState<Route[]>([]);
  const [editingRoute, setEditingRoute] = useState<Route | null>(null);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await databases.listDocuments('database', 'routes');
        setRoutes(response.documents as unknown as Route[]);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchRoutes();
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
    setEditingRoute({
      $id: '',
      name: '',
      description: '',
      stops: [],
    });
  };

  const handleEdit = (route: Route) => {
    setEditingRoute(route);
  };

  const handleDelete = async (id: string) => {
    try {
      await databases.deleteDocument('database', 'routes', id);
      setRoutes((prevRoutes) => prevRoutes.filter((route) => route.$id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSave = async (route: Route) => {
    try {
      const { $id, ...data } = route;

      if ($id) {
        await databases.updateDocument('database', 'routes', $id, data);
        setRoutes((prevRoutes) => prevRoutes.map((r) => (r.$id === $id ? { ...r, ...data } : r)));
      } else {
        const response = await databases.createDocument(
          'database',
          'routes',
          ID.unique(),
          data,
          [],
        );
        setRoutes((prevRoutes) => [...prevRoutes, response as unknown as Route]);
      }
      setEditingRoute(null);
    } catch (error) {
      console.log(error.message);
    }
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 150 },
    { field: 'description', headerName: 'Description', flex: 2, minWidth: 300 },
    {
      field: 'stops',
      headerName: 'Stops',
      flex: 1,
      minWidth: 150,
      valueGetter: (params: { row: Route }) =>
        params && params.row && params.row.stops ? params.row.stops.join(', ') : '',
    },
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
          Routes
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
          Create Route
        </Button>
      </Stack>
      <Divider />
      <Stack height={1}>
        <DataGrid
          apiRef={apiRef}
          columns={columns}
          rows={routes}
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
            noRowsOverlay: () => <section>No routes available</section>,
          }}
          sx={{
            height: 1,
            width: 1,
          }}
        />
      </Stack>
      {editingRoute && (
        <Dialog open={Boolean(editingRoute)} onClose={() => setEditingRoute(null)}>
          <DialogTitle>{editingRoute.$id ? 'Edit Route' : 'Create Route'}</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              value={editingRoute.name}
              onChange={(e) => setEditingRoute({ ...editingRoute, name: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
              value={editingRoute.description}
              onChange={(e) => setEditingRoute({ ...editingRoute, description: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Stops"
              type="text"
              fullWidth
              variant="standard"
              value={editingRoute && editingRoute.stops ? editingRoute.stops.join(', ') : ''}
              onChange={(e) =>
                setEditingRoute({ ...editingRoute, stops: e.target.value.split(', ') })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditingRoute(null)}>Cancel</Button>
            <Button onClick={() => handleSave(editingRoute)}>Save</Button>
          </DialogActions>
        </Dialog>
      )}
    </Stack>
  );
};

export default NewCustomers;
