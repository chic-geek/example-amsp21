import PropTypes from 'prop-types';

export default function Timestamp({ dateString }) {
  const isoDateStr = dateString.split('T')[0];
  return isoDateStr;
}

Timestamp.propTypes = {
  value: PropTypes.string,
};
