import { getAllMerchandise, getCcInfo } from './Database';
import React, { useState, useEffect } from 'react';
import PopUp from './PopUp';

function ResultsTable(props) {
  const [results, setResults] = useState({
    total_gross: 0,
    soft_gross: 0,
    hard_gross: 0,
    cc_fee: 0,
    soft_net: 0,
    hard_net: 0,
    casino_owed_soft: 0,
    casino_owed_hard: 0,
    total_casino_owed: 0,
    band_revenue: 0,
  });

  const [showPopUp, setShowPopUp] = useState(false);

  const fetchData = async () => {
    const data = await getAllMerchandise();
    const ccData = await getCcInfo();
    

    const response2 = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/total_gross`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const json2 = await response2.json();

    const response3 = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/soft_gross`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const json3 = await response3.json();

    const response4 = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/hard_gross`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const json4 = await response4.json();

    const response5 = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/soft_net`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({data: data, ccData: ccData})
    });
    const json5 = await response5.json();

    const response6 = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/hard_net`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const json6 = await response6.json();

    const response7 = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/casino_owed_soft`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({data: data, ccData: ccData})
    });
    const json7 = await response7.json();

    const response8 = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/casino_owed_hard`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const json8 = await response8.json();

    const response9 = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/total_casino_owed`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({data: data, ccData: ccData})
    });
    const json9 = await response9.json();

    const response10 = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/band_revenue`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({data: data, ccData: ccData})
    });
    const json10 = await response10.json();

    const response11 = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/cc_fee`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ccData)
    });
    const json11 = await response11.json();

    setResults({
        total_gross: json2.toFixed(2),
        soft_gross: json3.toFixed(2),
        hard_gross: json4.toFixed(2),
        soft_net: json5.toFixed(2),
        hard_net: json6.toFixed(2),
        casino_owed_soft: json7.toFixed(2),
        casino_owed_hard: json8.toFixed(2),
        total_casino_owed: json9.toFixed(2),
        band_revenue: json10.toFixed(2),
        cc_fee: json11.toFixed(2)
    });
};

useEffect(() => {
    fetchData();
}, [props.dataUpdated]);

const handlePopUp = () => {
    setShowPopUp(!showPopUp);
  };

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Total Gross</th>
              <th>Total Soft Gross</th>
              <th>Total Hard Gross</th>
              <th>Credit Card Fee</th>
              <th>Total Soft Net</th>
              <th>Total Hard Net</th>
              <th>Total Soft Owed Casino</th>
              <th>Total Hard Owed Casino</th>
              <th>Total Owed Casino</th>
              <th>Band Revenue Received</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{results.total_gross}</td>
              <td>{results.soft_gross}</td>
              <td>{results.hard_gross}</td>
              <td>{results.cc_fee}</td>
              <td>{results.soft_net}</td>
              <td>{results.hard_net}</td>
              <td>{results.casino_owed_soft}</td>
              <td>{results.casino_owed_hard}</td>
              <td>{results.total_casino_owed}</td>
              <td>{results.band_revenue}</td>
            </tr>
          </tbody>
        </table>
        <button onClick={handlePopUp}>View Calculations</button>
        {showPopUp && <PopUp results={results} handleClose={handlePopUp} />}
      </div>
    );
}
export default ResultsTable;