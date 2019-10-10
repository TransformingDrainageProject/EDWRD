import React from 'react';

const Introduction = () => {
  return (
    <div className="container">
      <p>
        EDWRD requires information about your local weather, field conditions
        (e.g. soil type, crop), and estimates regarding reservoir size in order
        to evaluate a drainage water recycling system.
      </p>
      <p>
        <strong>For users wanting a quick analysis</strong> to learn more about
        this tool and to see a few results describing the potential benefits of
        drainage water recycling, we've preloaded a set of defaults representing
        a corn field in east-central Indiana. Simply click on "Run EDWRD" to
        move on to viewing results.
      </p>
      <p>
        <strong>For advanced users</strong> who would like to learn more about
        potential benefits at a particular site or who have their own data, you
        may edit the defaults provided below. You may find out more about
        specific inputs by hovering over the ? and we've identified important
        inputs ( | ) which are influential in impacting results. These
        influential inputs should match your specific field conditions as
        closely as possible in order to get good estimates of the potential
        benefits from DWR for your site.
      </p>
      <hr />
    </div>
  );
};

export default Introduction;
