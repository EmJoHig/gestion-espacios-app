import React, { useState } from 'react';
import { Grid, Typography, IconButton, Box } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import dayjs from 'dayjs';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const MonthlyCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const startOfMonth = currentMonth.startOf('month');
  const endOfMonth = currentMonth.endOf('month');
  const startOfWeek = startOfMonth.startOf('week');
  const endOfWeek = endOfMonth.endOf('week');

  const generateDays = () => {
    const days = [];
    let day = startOfWeek;

    while (day.isBefore(endOfWeek)) {
      days.push(day);
      day = day.add(1, 'day');
    }

    return days;
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, 'month'));
  };

  return (
    <Box>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ marginBottom: 2 }}>
        <IconButton onClick={handlePreviousMonth}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h5">
          {currentMonth.format('MMMM YYYY')}
        </Typography>
        <IconButton onClick={handleNextMonth}>
          <ArrowForward />
        </IconButton>
      </Grid>
      <Grid container spacing={0}>
        <Grid item xs={12} sx={{ borderBottom: '1px solid #ddd' }}>
          <Grid container spacing={0}>
            {daysOfWeek.map((day) => (
              <Grid item xs={1} key={day} sx={{ padding: 1, textAlign: 'center' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {day}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={0}>
            {Array.from({ length: 5 }, (_, index) => (
              <Grid item xs={12} key={index}>
                <Grid container spacing={0}>
                  {generateDays().slice(index * 7, (index + 1) * 7).map((day) => (
                    <Grid
                      item
                      xs={1}
                      key={day.toString()}
                      sx={{
                        height: 120,
                        border: '1px solid #ddd',
                        backgroundColor: day.isSame(dayjs(), 'day') ? '#e0e0e0' : 'inherit',
                      }}
                    >
                      <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography>{day.date()}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MonthlyCalendar;