import React, { useEffect, useState } from "react";
import { getNodeRpcURL } from "../lib/utils";
import { Alert, Col, Space, Typography } from "antd";
import { Connection } from "@solana/web3.js";

const { Text } = Typography;

const Connect = () => {
  const [version, setVersion] = useState(null);

  useEffect(() => {
    getConnection();
  }, []);

  const getConnection = () => {
    const url = getNodeRpcURL();

    // Create a connection
    const solanaConnection = new Connection(url);

    // Get the API version
    const fetchVersion = async () => {
      const response = await solanaConnection.getVersion();
      console.log(response);
      setVersion(response);
      return response;
    };

    const res = fetchVersion();

    // save version to state
    // setVersion(res);
  };

  return (
    <Col style={{ width: "100%" }}>
      {version ? (
        <Alert
          message={
            <Space>
              Connected to Solana
              <Text code>v{version["solana-core"]}</Text>
            </Space>
          }
          type='success'
          showIcon
        />
      ) : (
        <Alert message='Not connected to Solana' type='error' showIcon />
      )}
    </Col>
  );
};

export default Connect;
