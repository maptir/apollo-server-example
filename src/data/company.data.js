const companies =  [{
    id: 1,
    name:"bnk48",
    userId: [1,2],
    customerId: [1, 3]
},{
    id: 2,
    name:"sweat16",
    userId: [3],
    customerId: [2, 4]
}]


export const getCompany = () => {
    return companies
}

export const addCompany = (company) => {
    company.id = companies.length + 1
    companies.push(company)
    return company
}

export const getCompanyByUser = (userId) => {
    const company = companies.filter(company=> company.userId.indexOf(userId) >= 0)
    return company.length > 0 ? company[0] : null
}

export const getCompanyByCust = (custId) => {
  const company = companies.filter(company => company.customerId.indexOf(custId) >= 0)
  return company.length > 0 ? company[0] : null
}
