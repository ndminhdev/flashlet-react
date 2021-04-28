import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const ProgressBar = ({ label, variant, progress, total }) => {
  const percent = (progress / total) * 100;
  const width = `${percent < 0 ? 0 : percent > 100 ? 100 : percent}%`;

  return (
    <div
      className={`progress-bar ${variant ? `progress-bar--${variant}` : ''}`}
    >
      <div className="progress-bar__outer">
        <span className="progress-bar__inner" style={{ width }}>
          &nbsp;
        </span>
      </div>
      <div className="progress-bar__text">
        <div className="progress-bar__label">{label}</div>
        <div className="progress-bar__progress">
          {progress}/{total}
        </div>
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  label: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['cyan', 'green', 'coral', 'gold', 'ink']),
  progress: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};

ProgressBar.defaultProps = {
  variant: 'cyan'
};

export default ProgressBar;
