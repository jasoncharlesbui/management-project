import { pullData, pushData, filterGenerator, getAttribute } from "./utils.js";
import { metaData } from "./metadata.js";
import _ from "lodash";
import { replaceAll } from "../utils";




const getProduct = (filters, page, numberOfRecords) => {
    let endPoint = `/api/options?filter=optionSet.id:eq:${metaData.PRODUCT.id}&paging=true&pageSize=${numberOfRecords}&page=${page}&fields=id,name,code,attributeValues&order=created:DESC${filterGenerator(filters)}`;
    return pullData(endPoint)
        .then(result => {
            return {
                products: transformFromDhis2(result),
                pageCount: result.pager.pageCount,
                total: result.pager.total
            }
        })
};

const addUpdateProduct = (product, mode) => {
    let endPoint = `/api/metadata`;
    return pushData(endPoint, transformToDhis2(product))
        .then(result => {
            return result;
        });
};


const deleteProduct = (product) => {
    let endPoint = `/api/metadata?importStrategy=DELETE`;
    return pushData(endPoint, transformToDhis2(product));
};

const transformFromDhis2 = (result) => {
    let products = [];
    result[metaData.PRODUCT.type].forEach(product => {
        products.push({
            productId: product.id,
            productCode: product.code,
            productName: product.name,
            productPrice: getAttribute(product, metaData.PRODUCT_PRICE.id),
            productActive: (getAttribute(product, metaData.PRODUCT_ACTIVE.id) == "true"),
            productInventory: getAttribute(product, metaData.PRODUCT_INVENTORY.id),
            productImage: getAttribute(product, metaData.PRODUCT_IMAGE.id)
        });
    });
    return products;
}

const transformToDhis2 = (product) => {
    console.log(product);
    let payload = {
        [metaData.PRODUCT.type]: [{
            id: product.productId,
            name: product.productName,
            code: product.productCode,
            sortOrder: 1,
            optionSet: {
                id: metaData.PRODUCT.id
            },
            attributeValues: [{
                value: parseInt(replaceAll(product.productPrice, ",", "")),
                attribute: {
                    id: metaData.PRODUCT_PRICE.id
                },
            }, {
                value: product.productInventory,
                attribute: {
                    id: metaData.PRODUCT_INVENTORY.id
                }
            }, {
                value: product.productActive.toString(),
                attribute: {
                    id: metaData.PRODUCT_ACTIVE.id
                }
            }, {
                value: product.productImage,
                attribute: {
                    id: metaData.PRODUCT_IMAGE.id
                }
            }]
        }]
    };
    return payload;
}

export {
    getProduct,
    addUpdateProduct,
    deleteProduct,
}