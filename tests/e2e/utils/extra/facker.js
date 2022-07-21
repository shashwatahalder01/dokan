
const { faker } = require('@faker-js/faker')


const randomFindName = faker.name.findName()
const randomFirstName = faker.name.firstName()
const randomLastName = faker.name.lastName()
const randomMiddleName = faker.name.middleName()

const randomPhone = faker.phone.phoneNumber()
const randomEmail = faker.internet.email()
const randomPassword = faker.internet.password()
const randomExampleEmail = faker.internet.exampleEmail()
const randomUserName = faker.internet.userName()
const randomUrl = faker.internet.url()
const randomColor = faker.internet.color()




const randomStreetName = faker.address.streetName()
const randomStreetAddress = faker.address.streetAddress()
const randomSecondaryAddress = faker.address.secondaryAddress()
const randomCity = faker.address.city()
const randomCityName = faker.address.cityName()
const randomCountry = faker.address.country()
const randomState = faker.address.state()
const randomZipCode = faker.address.zipCode()
const randomZipCodeByState = faker.address.zipCodeByState()

// console.log(randomStreetName)
// console.log(randomStreetAddress)
// console.log(randomSecondaryAddress)
// console.log(randomCity)
// console.log(randomCityName)
// console.log(randomCountry)
// console.log(randomState)
// console.log(randomZipCode)
// console.log(randomZipCodeByState)



const randomProduct = faker.commerce.product()
const randomProductName = faker.commerce.productName()
const randomPrice = faker.commerce.price()
const randomProductDescription = faker.commerce.productDescription()
const randomProductAdjective = faker.commerce.productAdjective()
const randomProductMaterial = faker.commerce.productMaterial()



const randomCompanyName = faker.company.companyName()
const randomCompanySuffixes = faker.company.suffixes()
const randomCompanySuffix = faker.company.companySuffix()
const randomBs = faker.company.bs()
const randomCatchPhraseNoun = faker.company.catchPhraseNoun()
const randomBsNoun = faker.company.bsNoun()
const randomBsBsAdjective = faker.company.bsAdjective()
const randomBsBuzz = faker.company.bsBuzz()

// const randomNumber = faker.datatype.number({ min: 1000000 })
const randomNumber1 = faker.datatype.number({min:1, max:5})
const randomNumber2 = faker.finance.amount(1, 200, 2)
const randomNumber3 = faker.datatype.number({min:1, max:200, precision: 0.01})


const randomUuid = faker.datatype.uuid()
const randomAlphaNumeric = faker.random.alphaNumeric(10)


const randomAccount = faker.finance.account()
const randomAccountName = faker.finance.accountName()
const randomRoutingNumber = faker.finance.routingNumber()
const randomCreditCardNumber = faker.finance.creditCardNumber()
const randomIban = faker.finance.iban()
const randomBic = faker.finance.bic()
const randomAmount = faker.finance.amount()


const randomName = faker.name.findName()
// const randomCard = faker.helpers.createCard()
const randomAvatar = faker.image.avatar()




const randomWord = faker.lorem.word()
const randomWords = faker.lorem.words()
const randomSentence = faker.lorem.sentence()
const randomSlug = faker.lorem.slug()
const randomSentences = faker.lorem.sentences()
const randomParagraph = faker.lorem.paragraph()
const randomParagraphs = faker.lorem.paragraphs()
const randomText = faker.lorem.text()
const randomLines = faker.lorem.lines()


// console.log(randomWords)
// console.log(faker.datatype.uuid())




// for (let i = 0; i < 100; i++) {
// console.log(faker.finance.amount(100, 200, faker.random.arrayElement([0,2])))
// }


// console.log(faker.helpers.arratElement(['abc', 'def']))


// const a = faker.finance.amount(100, 200, faker.helpers.arrayElement([1, 2]))

// console.log(a.replace('.',','))
// // console.log(a)
// console.log(typeof(a))
console.log(faker.finance.amount(100, 200, 0))