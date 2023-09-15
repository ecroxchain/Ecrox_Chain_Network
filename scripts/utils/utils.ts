import { JsonRpcProvider } from "@ethersproject/providers";
import { run, config as hardhatConfig } from "hardhat";
import { NetworkConfig } from "hardhat/types";
import {createInterface} from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const { networks } = hardhatConfig;

type VERIFY_OPTIONS_TYPE = {
  address: string;
  constructorArguments?: any[];
};

export async function verify(address: string, constructorArguments: any[] = []): Promise<void> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const options: VERIFY_OPTIONS_TYPE = {
      address,
    };
    if (Array.isArray(constructorArguments) && constructorArguments.length > 0) {
      options.constructorArguments = constructorArguments;
    }

    await run("verify:verify", options);
  } catch (error) {
    console.log(error.message ? error.message : error);
  }
}

export function getNetworkType(currentNetwork: string): string {
  let nameNetwork = currentNetwork;
  if (currentNetwork.indexOf("home") === 0) {
    nameNetwork = "Home";
  } else if (currentNetwork.indexOf("foreign") === 0) {
    nameNetwork = "Foreign";
  }
  return nameNetwork;
}

export function getDestinationNetworkName(currentNetwork: string): string {
  let nameNetwork = currentNetwork;
  switch (currentNetwork) {
    case "homeMainnet":
      nameNetwork = "foreignMainnet";
      break;
    case "foreignMainnet":
      nameNetwork = "homeMainnet";
      break;
    case "homeTestnet":
      nameNetwork = "foreignTestnet";
      break;
    case "foreignTestnet":
      nameNetwork = "homeTestnet";
      break;
    default:
      break;
  }
  return nameNetwork;
}

export function getDestinationNetwork(currentNetwork: string): NetworkConfig {
  const destinationNetwork = getDestinationNetworkName(currentNetwork);
  if (!networks[destinationNetwork]) {
    throw new Error(`Not found config for network ${destinationNetwork}`);
  }
  return networks[destinationNetwork];
}

export function getSourceNetwork(currentNetwork: string): NetworkConfig {
  if (!networks[currentNetwork]) {
    throw new Error(`Not found config for network ${currentNetwork}`);
  }
  return networks[currentNetwork];
}

function createQuestion(message, callback) {
  rl.question(`${message}: `, (inputMsg) => {
    if (inputMsg === "") {
      console.log(`Please input ${message}\n`);
      return createQuestion(message, callback);
    }
    return callback(inputMsg);
  });
}

export function createQuestionPromise(title: string): Promise<string> {
  return new Promise((resolve) => {
    createQuestion(title, (result) => {
      resolve(result);
    });
  });
}

export async function isContract(provider: JsonRpcProvider, address: string): Promise<boolean> {
  if (address === "0x")
    return false;
  const code = await provider.getCode(address);
  return code !== "0x" && code !== "0x0";
}

export function deferPromise (time) {
  return new Promise((resolve) => setTimeout(resolve, time || 0));
}