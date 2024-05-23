import { Container, Toolbar, Grid, Card, CardMedia, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import HeaderTrangChu from 'src/template/trang-chu/header';
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function TinTucSuKienTrangChuTemplates({
  rows,
  handleSearch,
  conditions,
  setConditions,
  setValueSearch,
  valueSearch,
  total,
  handleClear,
  fetchEventDetail,
  selectedEvent
}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = (eventId) => {
    fetchEventDetail(eventId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container>
      <Toolbar id="back-to-top-anchor" sx={{ position: 'absolute' }} />
      <HeaderTrangChu />
      <div style={{ marginTop: '20px' }}>
        <Grid container spacing={2}>
          {rows.map((row) => (
            <Grid item xs={12} md={4} key={row.id}>
              <Card onClick={() => handleClickOpen(row.id)} style={{ cursor: 'pointer' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={row.image}
                  alt={row.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {row.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {row.organizer}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Chi tiết Tin tức</DialogTitle>
        <DialogContent>
          {selectedEvent && (
            <DialogContentText>
                <Typography variant="h6">{selectedEvent.title}</Typography>
                <img src={selectedEvent.image} alt={selectedEvent.title} style={{ width: '100%', height: 'auto', marginTop: 10, marginBottom: 10 }} />
                <Typography variant="body2">{selectedEvent.description}</Typography>
                <Typography variant="body2">Địa điểm: {selectedEvent.location}</Typography>
                <Typography variant="body2">Ngày bắt đầu: {new Date(selectedEvent.dateStart).toLocaleDateString()}</Typography>
                <Typography variant="body2">Ngày kết thúc: {new Date(selectedEvent.dateEnd).toLocaleDateString()}</Typography>
                <Typography variant="body2">Tổ chức: {selectedEvent.organizer}</Typography>
              </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Đóng</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

TinTucSuKienTrangChuTemplates.propTypes = {
  rows: PropTypes.array.isRequired,
  handleSearch: PropTypes.func.isRequired,
  conditions: PropTypes.object.isRequired,
  setConditions: PropTypes.func.isRequired,
  setValueSearch: PropTypes.func.isRequired,
  valueSearch: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  handleClear: PropTypes.func.isRequired,
  fetchEventDetail: PropTypes.func.isRequired,
  selectedEvent: PropTypes.object,
};
