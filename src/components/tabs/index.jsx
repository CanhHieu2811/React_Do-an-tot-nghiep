import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';

const tabsExample = [
  {
    label: 'Item One',
    component: <>Item One</>,
    value: '1',
  },
  {
    label: 'Item Two',
    component: <>Item Two</>,
    value: '2',
  },
  {
    label: 'Item Three',
    component: <>Item Three</>,
    value: '3',
  },
];

export default function TabsComponent(props) {
  const { tabs = tabsExample, value, handleChangeTab, children } = props;

  const handleChange = (event, newValue) => {
    handleChangeTab(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" variant="scrollable">
            {tabs && tabs.map((el, i) => <Tab label={el.label} key={i} value={el.value} />)}
          </TabList>
        </Box>

        {tabs &&
          tabs.map((el, i) => (
            <TabPanel key={i} value={el.value}>
             {children || el.component} 
            </TabPanel>
          ))}
      </TabContext>
    </Box>
  );
}
TabsComponent.propTypes = {
  tabs: PropTypes.array,
  value: PropTypes.string,
  handleChangeTab: PropTypes.func,
  children: PropTypes.node
};
