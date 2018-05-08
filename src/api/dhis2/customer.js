import { pullData, pushData, filterGenerator, getTrackedEntityAttribute } from "./utils.js";
import { metaData } from "./metadata.js";
import _ from "lodash";
import { replaceAll } from "../utils";




const getCustomer = (filters, page, numberOfRecords) => {
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

const getCustomerList = (idList) => {
    let endPoint = `/api/trackedEntityInstances?trackedEntityInstance=${idList}`;
    return pullData(endPoint)
        .then(result => {
            return transformFromDhis2(result);
        })
}

const transformFromDhis2 = (result) => {
    let customers = [];
    result[metaData.CUSTOMER.type].forEach(customer => {
        customers.push({
            customerId: customer.trackedEntityInstance,
            customerName: getTrackedEntityAttribute(customer, metaData.CUSTOMER_NAME.id),
            customerDateOfBirth: getTrackedEntityAttribute(customer, metaData.CUSTOMER_DATE_OF_BIRTH.id),
            customerPhoneNumber: getTrackedEntityAttribute(customer, metaData.CUSTOMER_PHONE_NUMBER.id),
            customerEmail: getTrackedEntityAttribute(customer, metaData.CUSTOMER_EMAIL.id),
            customerAddress: getTrackedEntityAttribute(customer, metaData.CUSTOMER_ADDRESS.id),
            customerTaxNumber: getTrackedEntityAttribute(customer, metaData.CUSTOMER_TAX_NUMBER.id),
            customerNote: getTrackedEntityAttribute(customer, metaData.CUSTOMER_NOTE.id)
        });
    });
    return customers;
}





export {
    getCustomer,
    getCustomerList
}