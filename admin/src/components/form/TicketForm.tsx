import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { ChangeEvent, ReactElement, useState } from 'react';

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

interface TicketFormProps {
  ticket: Ticket;
  onSave: (ticket: Ticket) => void;
  onCancel: () => void;
}

export const TicketForm = ({ ticket, onSave, onCancel }: TicketFormProps): ReactElement => {
  const [formData, setFormData] = useState(ticket);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open onClose={onCancel}>
      <DialogTitle>{formData.$id ? 'Edit Ticket' : 'Create Ticket'}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            name="from"
            label="From"
            value={formData.from}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="to"
            label="To"
            value={formData.to}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="fromDate"
            label="From Date"
            value={formData.fromDate}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="fromTime"
            label="From Time"
            value={formData.fromTime}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="toDate"
            label="To Date"
            value={formData.toDate}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="toTime"
            label="To Time"
            value={formData.toTime}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="price"
            label="Price"
            value={formData.price}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
