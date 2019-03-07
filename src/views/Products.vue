<template>
  <div class="overview">
      <div class="container">
          <h3>Products Page</h3>
          <hr>
          <div class="intro h-100">
            <div class="row h-100">
              <div class="col-md-6 justify-content-center align-items-center">                
                <h3>All products</h3>
                <table class="table table-bordered table-striped">

                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="product in products">
                      <td>{{ product.name }}</td>
                      <td>{{ product.price }}</td>
                      <td>
                        <button class="btn btn-xs btn-success">Edit</button>
                        &nbsp;&nbsp;&nbsp;
                        <button class="btn btn-xs btn-danger">Delete</button>
                      </td>
                    </tr>
                  </tbody>

                </table>

              </div>
              <div class="col-md-6">
                
                <h5 class="text-center">Add Product</h5>
                <div class="form-group">
                    <label for="exampleInputEmail1">Product name</label>
                    <input type="name" v-model="product.name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter name">
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Product price</label>
                    <input type="price" @keyup.enter="saveData" v-model="product.price" class="form-control" id="exampleInputPassword1" placeholder="Enter price">
                </div>
                <div class="form-group">
                    <button class="btn btn-success" type="submit" @click="saveData">Save product</button>
                </div>

              </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import { fb, db } from '../firebase';

export default {
  name: 'Products',
  props: {
    msg: String
  }, 
  data()
  {
    return {
      // products: {}, // object initialization
      products: [], // array initialization
      product: 
      {
        name: null,
        price: null
      }
    }
  },
  methods: {
    readData()
    {
      this.reset();
      db.collection('products').get()
      .then((querySnapshot) =>  {
        querySnapshot.forEach((doc) => {
          //console.log(doc.id, " => ", doc.data());
          this.products.push(doc.data());
        });
      });
    },
    saveData() 
    {
      // Add a new document in collection "products"
      db.collection("products").add(this.product)
      .then(() => {
          console.log("Document successfully saved!");
          this.readData();
      })
      .catch(function(error) {
          console.error("Error saving document: ", error);
      });
    },

    reset()
    {
      Object.assign(this.$data, this.$options.data.apply(this));
    }
  },

  created() {
    this.readData();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
