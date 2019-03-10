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
                      <td>{{ product.data().name }}</td>
                      <td>{{ product.data().price }}</td>
                      <td>
                        <button class="btn btn-xs btn-success" @click="editProduct(product)">Edit</button>
                        &nbsp;&nbsp;&nbsp;
                        <button class="btn btn-xs btn-danger" @click="deleteProduct(product.id)">Delete</button>
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

      <!-- Update Modal -->
            <div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Update Product</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    
                      <div class="form-group">
                    <label for="">Product name</label>
                    <input type="name" v-model="product.name" class="form-control" id="" aria-describedby="emailHelp" placeholder="Enter name">
                      </div>
                      <div class="form-group">
                          <label for="">Product price</label>
                          <input type="price" @keyup.enter="saveData" v-model="product.price" class="form-control" id="" placeholder="Enter price">
                      </div>

                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" @click="updateProduct()" class="btn btn-primary">Save changes</button>
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
      },
      activeItem: null
    }
  },
  methods: {

    watcher()
    {
      db.collection("products")
      .onSnapshot((querySnapshot) => {
          this.products = [];
          querySnapshot.forEach((doc) => {
              this.products.push(doc);
          });
          console.log(this.products.join(", "));
      });
    },

    editProduct(product)
    {
      $('#updateModal').modal('show');
      this.product = product.data();
      this.activeItem = product.id;
    },

    updateProduct()
    {
      db.collection('products').doc(this.activeItem).update(this.product)
        .then(() => {
          $('#updateModal').modal('hide');
          this.watcher();
          //this.readData();
          console.log("Data updated successfully!");         
        })
        .catch((error) => {
          console.error("Error updating document:", error);
          
        });
    },

    deleteProduct(doc)
    {
      if(confirm('Are you sure?')) {
        db.collection('products').doc(doc).delete()
        .then(() => {
          console.log("Data deleted successfully!");   
          this.readData();      
        })
        .catch((error) => {
          console.error("Error removing document:", error);
          
        });
      }
      else
      {

      }
    },
    readData()
    {
      this.reset();
      db.collection('products').get()
      .then((querySnapshot) =>  {
        querySnapshot.forEach((doc) => {
          //console.log(doc.id, " => ", doc.data());
          //this.products.push(doc.data());
          this.products.push(doc);
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
