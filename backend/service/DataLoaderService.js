const dataLoaderDao = require('../dao/DataLoaderDao');
const axios = require('axios');
const {
    schemesApi,
    fundPortfolioApi
} = require('../configs/constants')

class DataLoaderService {
    async processMfListData(mfList) {
        //console.log(mfList);
        const codesByType = this.getCodes(mfList);

        const finalResult = []
        let fundPortfolioResult;
        const mfTypesList = [];
        for (const mType in codesByType) {
            mfTypesList.push({
                'fundType': mType //here
            });
        }
        const mfTypesResult = await dataLoaderDao.saveMfTypes(mfTypesList);
        const mfTypesMapper = {}
        console.log('mfTypesResult', mfTypesResult)
        if (mfTypesResult && mfTypesResult.length) {
            mfTypesResult.forEach(mfT => {
                console.log(mfT)
                mfTypesMapper[mfT.fundType] = mfT.id; //here
            })
        }
        const subTypeList = [];
        for (const mfType in codesByType) {
            for (const mfSubType in codesByType[mfType]) {
                subTypeList.push({
                    'fundSubtype': mfSubType, //here
                    'fundTypeId': mfTypesMapper[mfType] //here
                });
            }
        }
        const mfSubTypesResult = await dataLoaderDao.saveMfSubTypes(subTypeList);
        const mfSubTypesMapper = {}
        if (mfSubTypesResult && mfSubTypesResult.length) {
            mfSubTypesResult.forEach(mfST => {
                mfSubTypesMapper[mfST.fundSubtype] = mfST.id; //here
            })
        }
        for (const mType in codesByType) {
            for (const mSubType in codesByType[mType]) {
                let codes = codesByType[mType][mSubType].slice(0, 15);
                let url = schemesApi;
                let fundPortfolioUrl = fundPortfolioApi;
                for (let code of codes) {
                    url += code + '%7C'
                    fundPortfolioUrl += code + '%7C'
                }
                url = url.trim();
                url = url.substring(0, url.length - 3);
                url += '.json';
                const listResult = await axios.get(url);
                if (listResult.data && listResult.data.length) {
                    for (const res of listResult.data) {
                        res['last_nav'] = JSON.stringify(res['last_nav']);
                        res['sips'] = JSON.stringify(res['sips']);
                        res['nav'] = JSON.stringify(res['nav']);
                        res['returns'] = JSON.stringify(res['returns']);
                        res['fund_type_id'] = mfTypesMapper[mType];
                        res['fund_subtype_id'] = mfSubTypesMapper[mSubType];
                        delete res['fund_type'];
                        delete res['fund_category'];
                    }
                    const saveResult = await dataLoaderDao.saveMfSchemes(listResult.data);
                    const schemeMapper = {};
                    if (saveResult && saveResult.length) {
                        saveResult.forEach(res => {
                            schemeMapper[res.code] = res.id
                        });
                    }
                    //console.log(schemeMapper);
                    //Fetch, map and save fund portfolios

                    fundPortfolioUrl = fundPortfolioUrl.trim();
                    fundPortfolioUrl = fundPortfolioUrl.substring(0, fundPortfolioUrl.length - 3);
                    fundPortfolioUrl += '.json';
                    //console.log(fundPortfolioUrl)
                    const portfolioResponse = await axios.get(fundPortfolioUrl);
                    const fundResult = portfolioResponse.data;
                    if (fundResult) {
                        for (const mfCode in fundResult) {
                            //console.log(mfCode)
                            for (const mfFund of fundResult[mfCode]) {
                                mfFund['scheme_id'] = schemeMapper[mfCode];
                            }
                            if (fundResult[mfCode] && fundResult[mfCode].length) {
                                console.log(mfCode)
                                const portfolioResult = await dataLoaderDao.saveFundPortfolio(fundResult[mfCode]);
                                fundPortfolioResult = portfolioResult;
                            }

                        }
                        //fundPortfolioResult = fundResult
                    }
                    finalResult.push(saveResult);
                }
            }
        }
        return fundPortfolioResult;
    }

    async checkIfListExists() {
        let listVal = await dataLoaderDao.checkIfListExists();
        if (listVal && listVal.length) {
            return listVal[0]['listData']; //here
        }
        return null;
    }

    async saveList(mfList) {
        let result = await dataLoaderDao.saveList(mfList);
        return result;
    }

    getCodes(mfList) {
        const codesByType = {}
        for (const mfType in mfList) {
            //console.log(mfType)
            codesByType[mfType] = {};
            for (const mfSubType in mfList[mfType]) {
                //console.log(mfSubType);
                //codesByType[mfType][mfSubType] = {};
                const listOfCodes = [];
                for (const mfHouse in mfList[mfType][mfSubType]) {
                    for (const mf of mfList[mfType][mfSubType][mfHouse]) {
                        //console.log(mf)
                        listOfCodes.push(mf.c);
                        break;
                    }
                }
                codesByType[mfType][mfSubType] = listOfCodes;
            }
            // codesByType[mfType] = listOfCodes;
        }
        return codesByType;
    }
}

module.exports = new DataLoaderService();