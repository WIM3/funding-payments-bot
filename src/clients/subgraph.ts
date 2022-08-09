import axios from 'axios';

import { SUBGRAPH_URL } from '../common/constants';
import { Amm } from '../common/types';

const QUERY_LIMIT = 1000;

/**
 * Queries relevant data from subgraph
 * @returns {Promise.<Amm[]>} List of user loans
 */
export const getAmms = async (): Promise<Amm[]> => {
  let amms: Amm[] = [];
  let last = '';

  while (true) {
    const res = (
      await axios.post(
        SUBGRAPH_URL,
        {
          query: `query GetAmms {
              amms (first: ${QUERY_LIMIT}, where: { id_gt: "${last}" }) {
                id
                fundingPeriod
              }
            }`,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      )
    ).data;
    if (res.errors) throw res.errors[0].message;

    const tmp: Amm[] = res.data.amms;
    amms = amms.concat(tmp);

    if (tmp.length < QUERY_LIMIT) break;
    last = tmp[tmp.length - 1].id;
  }

  return amms;
};
