<template>
  <div class="overview">
      <div class="container">
          <h3>Products Page</h3>
          <hr>
          <div class="intro h-100">
            <div class="row h-100">
              <div class="col-md-12 justify-content-center align-items-center">                
                <h3 class="d-inline-block">All products</h3>
                <button class="btn btn-xs btn-success float-right" @click="addNew">Add Product</button>
                <hr>

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
                        <button class="btn btn-xs btn-success" @click="editProduct(product)">Edit</button>
                        &nbsp;&nbsp;&nbsp;
                        <button class="btn btn-xs btn-danger" @click="deleteProduct(product)">Delete</button>
                      </td>
                    </tr>
                  </tbody>

                </table>

              </div>
            </div>
          </div>
      </div>

      <!-- Update Modal -->

      <div class="modal fade" id="product" tabindex="-1" role="dialog">
              <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Update Product</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body form-horizontal">
                    
                    <div class="row">
                    <div class="col-sm-8">
                      <div class="form-group">
                        <label for="">Product name</label>
                        <input type="name" v-model="product.name" class="form-control" id="" placeholder="Enter name">
                      </div>

                      <div class="form-group">
                        <label for="">Product description</label>
                        <vue-editor v-model="product.description"></vue-editor>
                      </div>
                    </div>

                    <div class="col-sm-4">
                      <div class="form-group">
                        <label for="">Product price</label>
                        <input type="name" v-model="product.price" class="form-control" id="" placeholder="Enter price">
                      </div>

                      <div class="form-group">
                        <label for="">Product tags</label>
                        <input type="price" v-model="product.tags" class="form-control" id="" placeholder="Enter tags">
                      </div>

                      <div class="form-group">
                        <label for="">Product images</label>
                        <div class="custom-file">
                          <input type="file" class="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01">
                          <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
                        </div>
                      </div>

                    </div>
                    </div>



                  </div>

                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" @click="addProduct()" class="btn btn-primary" v-if="modal == 'new' ">Save changes</button>
                    <button type="button" @click="updateProduct(product)" class="btn btn-primary" v-if="modal == 'edit' ">Update changes</button>
                  </div>
                </div>
              </div>
            </div>

  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { fb, db } from '../firebase';

export default {
  name: 'Products',
  components: {
    VueEditor
  },
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
        description: null,
        tag: null,
        price: null,
        image: null
      },
      activeItem: null,
      modal: null
    }
  },

  firestore() {
    return {
      products: db.collection("products"),
    }
  },

  methods: {

    addNew()
    {
      this.modal = 'new';
      $('#product').modal('show');
    },

    watcher()
    {

    },

    editProduct(product)
    {
      this.modal = 'edit';
      this.product = product;
      $('#product').modal('show');
    },

    updateProduct()
    {
      this.$firestore.products.doc(this.product.id).update(this.product);
      $('#product').modal('hide');
      Toast.fire({
            type: 'success',
            title: 'Data updated successfully'
          })
    },

    deleteProduct(doc)
    {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {

          this.$firestore.products.doc(doc['.key']).delete();

          Toast.fire({
            type: 'success',
            title: 'Data Deleted successfully'
          })
        }
      });
    },

    readData()
    {

    },

    addProduct() 
    {
      this.$firestore.products.add(this.product);
      $('#product').modal('hide');
    },

    reset()
    {

    }
  },

  created() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
