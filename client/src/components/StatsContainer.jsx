import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/StatsContainer';
import StatItem from './StatItem';
const StatsContainer = ({ defaultStats }) => {
  const stats = [
    {
      title: 'pending review',
      count: defaultStats?.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: '#f59e0b',
      bcg: '#fef3c7',
    },
    {
      title: 'movies reviewed',
      count: defaultStats?.review || 0,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'rotten movies',
      count: defaultStats?.rotten || 0,
      icon: <FaBug />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
  ];
  return (
    <Wrapper>
      {stats.map((item) => {
        return <StatItem key={item.title} {...item} />;
      })}
    </Wrapper>
  );
};
export default StatsContainer;
