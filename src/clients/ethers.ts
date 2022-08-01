import { ethers } from 'ethers';

import clearingHouseAbi from '../abi/ClearingHouse.json';

import { CLEARING_HOUSE, PROVIDER_URL, WALLET_PK } from '../common/constants';

const provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL);
const wallet = new ethers.Wallet(WALLET_PK, provider);
const contract = new ethers.Contract(CLEARING_HOUSE, clearingHouseAbi, wallet);
