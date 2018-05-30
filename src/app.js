import {
  graphqlExpress,
  graphiqlExpress
} from 'apollo-server-express';
import {
  makeExecutableSchema
} from 'graphql-tools'
import bodyParser from 'body-parser';
import express from 'express'
import {
  getUserById,
  addUsers,
  getUsers
} from './data/user.data'
import {
  getCompany,
  addCompany,
  getCompanyByUser,
  getCompanyByCust
} from './data/company.data'
import {
  getCustomers,
  addCustomer,
  getCustById
} from './data/customer.data'

import cors from 'cors'

const app = express()
const PORT = 8880

app.use(cors())

const typeDefs = `
    type Company {
      id:Int
      name:String
      users:[User]
      customers:[Customer]
    }
    type User {
      id:Int
      firstName:String
      lastName:String
      fullName:String
      email:String
      company:Company
    }
    type Customer {
      id:Int
      firstName:String
      lastName:String
      email:String
      website:String
      company:Company
    }
    input CreateUserInput {
      id: Int
      firstName: String
      lastName: String
      email: String
    }
    input CreateCompanyInput {
      id: Int
      name: String
      userId: [Int]
      customerId: [Int]
    }
    input CreateCustomerInput {
      id:Int
      firstName:String
      lastName:String
      email:String
      website:String
    }
    type Mutation {
      createUser(createUserInput: CreateUserInput) : User
      createCompany(createCompanyInput: CreateCompanyInput) : Company
      createCustomer(createCustomerInput: CreateCustomerInput) : Customer
    }
    type Query {
      something: String
      user(id: Int) : User
      customer(id: Int): Customer
      users : [User]
      companies: [Company]
      customers: [Customer]
    }
    schema {
      query: Query
      mutation: Mutation
    }
  `

const resolvers = {
  Query: {
    user(root, {
      id
    }) {
      return getUserById(id)
    },
    customer(root, { id }) {
      return getCustById(id)
    },
    users() {
      return getUsers()
    },
    companies() {
      return getCompany()
    },
    customers() {
      return getCustomers()
    }
  },
  Mutation: {
    createUser(root, {
      createUserInput
    }) {
      const user = addUsers(createUserInput)
      return user
    },
    createCompany(root, {
      createCompanyInput
    }) {
      const company = addCompany(createCompanyInput)
      return company
    },
    createCustomer(root, {
      createCustomerInput
    }) {
      const customer = addCustomer(createCustomerInput)
      return customer
    }
  },

  Company: {
    users(company) {
      return company.userId.map(userId => getUserById(userId))
    },
    customers(company) {
      return company.customerId.map(custId => getCustById(custId))
    }
  },
  User: {
    fullName(user) {
      return `${user.firstName} ${user.lastName}`
    },
    company(user) {
      return getCompanyByUser(user.id)
    }
  },
  Customer: {
    company(customer) {
      return getCompanyByCust(customer.id)
    }
  }
}


const schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
})

app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema
}))
app.get('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}))


app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
