import { pullData, pushData, filterGenerator, getDataValue } from "./utils.js";
import { metaData } from "./metadata.js";
import _ from "lodash";
import { replaceAll } from "../utils";

const getTransaction = (filters, page, numberOfRecords) => {
    let endPoint = `/api/events.json?program=${metaData.TRANSACTION.id}&pageSize=${numberOfRecords}&totalPages=true&page=${page}&order=eventDate:DESC`;

    return pullData(endPoint)
        .then(result => {
            return {
                transactions: transformFromDhis2(result),
                pageCount: result.pager.pageCount,
                total: result.pager.total
            }
        })
};

// const addUpdateProduct = (product, mode) => {
//     let endPoint = `/api/metadata`;
//     return pushData(endPoint, transformToDhis2(product))
//         .then(result => {
//             return result;
//         });
// };


// const deleteProduct = (product) => {
//     let endPoint = `/api/metadata?importStrategy=DELETE`;
//     return pushData(endPoint, transformToDhis2(product));
// };

const transformFromDhis2 = (result) => {
    let transactions = [];
    result[metaData.TRANSACTION.type].forEach(transaction => {
        transactions.push({
            transactionId: transaction.event,
            transactionTime: getDataValue(transaction, metaData.TRANSACTION_TIME.id),
            transactionStatus: getDataValue(transaction, metaData.TRANSACTION_STATUS.id),
            transactionCustomer: transaction.trackedEntityInstance,
            transactionItems: JSON.parse(getDataValue(transaction, metaData.TRANSACTION_ITEMS.id)),
            transactionTotal: getDataValue(transaction, metaData.TRANSACTION_TOTAL.id),
            transactionDiscount: getDataValue(transaction, metaData.TRANSACTION_DISCOUNT.id),
            transactionAmount: getDataValue(transaction, metaData.TRANSACTION_AMOUNT.id),
            transactionPayedAmount: getDataValue(transaction, metaData.TRANSACTION_PAYED_AMOUNT.id),
        });
    });
    return transactions;
}

// const transformToDhis2 = (product) => {
//     console.log(product);
//     let payload = {
//         [metaData.PRODUCT.type]: [{
//             id: product.productId,
//             name: product.productName,
//             code: product.productCode,
//             sortOrder: 1,
//             optionSet: {
//                 id: metaData.PRODUCT.id
//             },
//             attributeValues: [{
//                 value: parseInt(replaceAll(product.productPrice, ",", "")),
//                 attribute: {
//                     id: metaData.PRODUCT_PRICE.id
//                 },
//             }, {
//                 value: product.productInventory,
//                 attribute: {
//                     id: metaData.PRODUCT_INVENTORY.id
//                 }
//             }, {
//                 value: product.productActive.toString(),
//                 attribute: {
//                     id: metaData.PRODUCT_ACTIVE.id
//                 }
//             }, {
//                 value: product.productImage,
//                 attribute: {
//                     id: metaData.PRODUCT_IMAGE.id
//                 }
//             }]
//         }]
//     };
//     return payload;
// }



export {
    getTransaction
}