import { useState, useEffect } from 'react';

const AccountInformation= () => {
  const [accountInfo, setAccountInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/pages/api/dashboard/account-information');
      const data = await res.json();
      setAccountInfo(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      {accountInfo ? (
        <>
          <p>Assets under management: {accountInfo.assetsUnderManagement}</p>
          <p>Allocation of funds:</p>
          <ul>
            <li>Low risk: {accountInfo.allocation.lowRisk}</li>
            <li>Medium risk: {accountInfo.allocation.mediumRisk}</li>
            <li>High risk: {accountInfo.allocation.highRisk}</li>
          </ul>
          <p>Current month profit: {accountInfo.currentMonthProfit}</p>
        </>
      ) : (
        <p>Loading account information...</p>
      )}
    </div>
  );
};

export default AccountInformation;
