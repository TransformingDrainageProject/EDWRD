import React, { useState } from 'react';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const HelpPopover = (props) => {
  const { helpText, label, name, position, top } = props;
  const [popoverOpen, setPopoverOpen] = useState(false);
  const toggle = () => setPopoverOpen(!popoverOpen);

  return (
    <div>
      <FontAwesomeIcon
        style={
          position === 'top'
            ? { position: 'absolute', top: top ? top : 0, right: '15px' }
            : { position: 'absolute', bottom: 0, right: 0, margin: '5px' }
        }
        icon={faQuestionCircle}
        id={name}
      />
      <Popover
        placement="bottom"
        isOpen={popoverOpen}
        target={name}
        toggle={toggle}
      >
        <PopoverHeader>Help: {label}</PopoverHeader>
        <PopoverBody style={{ maxHeight: '350px', overflowY: 'scroll' }}>
          {helpText}
        </PopoverBody>
      </Popover>
    </div>
  );
};

HelpPopover.propTypes = {
  helpText: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string,
};

export default HelpPopover;
