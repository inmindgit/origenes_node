# Origenes 

## Server and webplatform

This application provides access to add humans as well as ask for genetic samples to be further inserted and look for coincidences
There is 4 user profiles Admin, Laboratory, Operator and Viewer.

You can see it working by browsing : https://origenes-aepp.herokuapp.com/ and do the following instructions 
https://drive.google.com/file/d/10GPl8PJVafS80NIjOg7nlFw4K9i3lApe/view?usp=sharing

## Smart Contract

This platforms works with Smart Contracts based on aeternity.com blockchain . The associated contract repo can be find here: 

https://github.com/inmindgit/origenes (this doesn't need to be installed for making this project work unless you want to run it fully local)

## Install project
1. Clone this repository
2. Install dependencies by: 
  
  `npm install`

3. This project uses `nodemon` for Live Reload. This package should be installed globally by:

  `npm install -g nodemon`

4. Execute from console by running: 
  
  `npm run dev`

## Dependencies

  Styling and markup: AdminLTE
  Template engine: PUG

## Docker
You can run this project with docker and docker-compose.
Run this command `docker-compose up`.

## Use

Use one of the following key pairs precharged as login

Contract Owner:

Public Key "ak_xew1bEqH4f59jNdP9jwRmBfBWDa3uoWqMdcsoZ1F2ZkrtXTcB"
Private Key "54cbdf775706568d58705c574b358831e68be41eeb35304810e7b7b4033971897e5e82de52e7e296cba9cc4167bf4be210a6e5133e32ecb9cb12d45b50b44093"

Admin:

Public Key "ak_2AKzXHEE3bA4s74B1RHj4N1n5tDaNt5rQEruttKSkd8JhhKs6U"
Private Key "16da72f434e1d5ec296d336c5eaa6b5f3de527828a0f1c5993ab1737531bdfcc98e00cfe85ba6f6314d546cc5ee36dff4e037ee39bc02b4704637510c299a8d6"

Laboratory:

Public Key "ak_22QpWFkBYWBhALduLpr4ZVQ7xMCDB8sF6KN63DrzGtcBniXTha"
Secret Key "24413766d3d68eced4ffdd1f67d209ab0045a4c9cb06d7551f4956d44f0ae76486e6320cf69b5829b5b749d81f933ca4c36932e3bf8196c3a456779ab9832085"

Operator:

Public Key "ak_r96z4YiSFuP5r2rHHJTisCq4puffNCrrPvXSbFgqxHgMf6RHr"
Secret Key "97075de064e839987aba1149a54213cbd74acc7083c052ad16dc14a8db0f74b96f93e59fdf56d846af7b0dba56a25c35a767897a668fcafdb24f7109c6e9533b"

Viewer:

Public Key "ak_uhxgm72mR1JfuKN3VgZAk4EdmgYj7XEBganik3FRMKXazDkLP"
Secret Key "19a311b2d7cf1d6b07ecae478a9d8f8a5e49d7b7e9ea1103004a8c7860da860a77ad0766f39c465cb2d1f06da7f1d8eb0a4cf357ae22676e3b2e5f1f354ec45b"

In case of creating new ones you should do the following

1. Install aecli by
$ npm aecli -i
$ aecli account generate 1

2. Put some AE tokens into the new address by using this faucet:

https://faucet.aepps.com/

3. Add them to the contract (has to be contract owner or admin) using add_user entrypoint

4. Login with any of the above users (public key as user and private key as password)
