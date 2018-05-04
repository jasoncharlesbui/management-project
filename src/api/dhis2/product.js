import { pullData, pushData, filterGenerator } from "./utils.js";
import { metaData } from "./metadata.js";
import _ from "lodash";
import { replaceAll } from "../utils";




const getProduct = (filters, page, numberOfRecords) => {
    let endPoint = `/api/options?filter=optionSet.id:eq:${metaData.PRODUCT.id}&paging=true&pageSize=${numberOfRecords}&page=${page}&fields=id,name,code,attributeValues&order=created:DESC${filterGenerator(filters)}`;
    return pullData(endPoint, 1)
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
            if (mode === "add") {
                return pushData(`/api/optionSets/${metaData.PRODUCT.id}/options/${product.productId}`, {})
            } else {
                return result;
            }
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
    let payload = {
        [metaData.PRODUCT.type]: [{
            id: product.productId,
            name: product.productName,
            code: product.productCode,
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
    deleteProduct,
}