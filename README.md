**Attention:**

There is an annoying issue, it seems when `docker-compose up` is run the first time, it takes a moment for `postgres` to be ready to accept connections.
This causes the app to crash, because it cannot connect to the database. To fix this, just restart the app container after the initial setup.
I did not want to invest more time here to solve this setup issue. 

**Installation:**
1. Clone repository
2. `docker-compose build`
3. `docker-compose up`

**Suggestions for improvements:**
- better type safeness (e.g. using typescript)
- improve the dependency management, especially in the controller class  (have not worked with node for a while, not sure how to best approach this atm)
- the node_moduls directory is not accessible on the host machine (some docker permissions issue I could not quickly solve)
- add unit tests
- use env file 
