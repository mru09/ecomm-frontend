// src/components/common/TabView.jsx

import React from 'react';
import { Box, Button } from '@mui/material';

export default function TabView({ tabs, activeTab, onChange }) {
  return (
    <Box>
      {/* Tab Buttons */}
      <Box
        display="flex"
        gap={2}
        mb={2}
        borderBottom={1}
        borderColor="divider"
      >
        {tabs.map((tab) => (
          <Button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            variant={activeTab === tab.key ? 'contained' : 'outlined'}
            color="primary"
          >
            {tab.label}
          </Button>
        ))}
      </Box>

      {/* Active Tab Content */}
      <Box>{tabs.find((tab) => tab.key === activeTab)?.component}</Box>
    </Box>
  );
}
