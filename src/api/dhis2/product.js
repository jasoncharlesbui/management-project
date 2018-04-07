import { pullData, pushData, editData } from "./utils.js";
import { metaData } from "./metadata.js";
import _ from "lodash";
import { replaceAll } from "../utils";


const getProduct = (page) => {
    let endPoint = `/api/options?filter=optionSet.id:eq:${metaData.PRODUCT.id}&paging=true&pageSize=14&page=${page}&fields=id,name,code,attributeValues&order=created:DESC`;
    return pullData(endPoint, 1)
        .then(result => {
            return {
                products: transformFromDhis2(result),
                pageCount: result.pager.pageCount,
                total: result.pager.total
            }
        })
}

const addUpdateProduct = (product) => {
    let endPoint = `/api/metadata`;
    return pushData(endPoint, transformToDhis2(product))
        .then(result => {
            return pushData(`/api/optionSets/${metaData.PRODUCT.id}/options/${product.productId}`, {})
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
            productInventory: getAttribute(product, metaData.PRODUCT_INVENTORY.id),
            productImage: getAttribute(product, metaData.PRODUCT_IMAGE.id)
        })
    });
    return products;
}

const transformToDhis2 = (product) => {
    let payload = {
        [metaData.PRODUCT.type]: [{
            id: product.productId,
            name: product.productName,
            code: product.productCode,
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
                value: product.productImage,
                attribute: {
                    id: metaData.PRODUCT_IMAGE.id
                }
            }]
        }]
    };
    return payload;
}

const getAttribute = (product, attributeId) => {
    let attributeValue = product.attributeValues.find(attr => attr.attribute.id == attributeId);
    if (attributeValue) {
        return attributeValue.value;
    } else {
        return "";
    }
}

export {
    getProduct,
    addUpdateProduct,
    deleteProduct
}