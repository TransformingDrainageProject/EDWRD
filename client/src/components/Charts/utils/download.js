import axios from 'axios';
import fileDownload from 'js-file-download';

async function downloadResults(sessionID, type) {
  try {
    const config = {
      method: 'get',
      responseType: 'blob',
      url: '/api/download_results',
      headers: {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
      params: { sessionID, type },
    };
    const response = await axios(config);
    if (response) {
      fileDownload(
        response.data,
        type === 'annual'
          ? 'annual_results.xlsx'
          : type === 'monthly'
          ? 'monthly_results.xlsx'
          : 'daily_results.xlsx'
      );
    } else {
      console.log('unable to download');
    }
  } catch (err) {
    console.log(err);
  }
}

export default downloadResults;
