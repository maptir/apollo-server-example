const customers = [
  {
    id: 1,
    firstName: "Archawin",
    lastName: "Tirugsapun",
    email: "archawin.t@ku.th",
    website: "github.com/zepalz"
  }, {
    id: 2,
    firstName: "Qwerty",
    lastName: "Asdfg",
    email: "qwerty@gmail.com",
    website: "github.com/qwerty"
  }, {
    id: 3,
    firstName: "Zxcvb",
    lastName: "Uiop",
    email: "zxcvb@gmail.com",
    website: "github.com/zxcvb"
  }, {
    id: 4,
    firstName: "Hjkl",
    lastName: "nm",
    email: "hjkl@gmail.com",
    website: "github.com/hjkl"
  }
]


export const getCustomers = () => {
  return customers
}

export const addCustomer = (customer) => {
  customer.id = customers.length + 1
  customers.push(customer)
  return customer
}

export const getCustById = (id) => {
  return customers.filter(item => item.id === id )[0]
}
