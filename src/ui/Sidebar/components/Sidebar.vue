<template>
    <div class="sidebar branding-below">
        <h1>My add-on</h1>
      <h2>Items to export:</h2>
      <ul v-if="items.length">
        <li v-for="(item, index) in items">
          <a href="#" @click.prevent="items.splice(index,1)">X</a> {{item.getFileNameWithExtension()}}
        </li>
      </ul>
      <div v-else>Select items to add them to the list</div>

      <label><input type="checkbox" v-model="background"> Include background in export</label>

        <button class="blue" @click="exportSelection">Add selection to list</button>
      <button @click="download" v-if="items.length">Download exported items</button>
    </div>
</template>

<script>

    import JSZip from "jszip";
    import {saveAs} from 'file-saver';
    import {ImageItem} from "../Items/ImageItem";
    import {BackgroundItem} from "../Items/BackgroundItem";

    export default {
        data(){
            return {
                items: [],
              background: true
            }
        },
      methods: {
          exportSelection(){
            // @ts-ignore
            google.script.run.withSuccessHandler((data)=>{
              if(data){
                for(let item of data){
                  this.addItem(item);
                }
              }
            }).exportItems({background: this.background});
          },
        addItem(item){
          let exists = false;
          for(let i=0; i<this.items.length; i++){
            if(this.items[i].id === item.id){
              this.items[i] = this.makeItem(item);
              exists = true;
            }
          }
          if(!exists){
            this.items.push(this.makeItem(item));
          }
        },
        makeItem(data){
            const type = data.type;
            switch(type){
              case 'image':
                return new ImageItem(data);
              case 'background':
                  return new BackgroundItem(data);
            }
            return null;
        },
        download(){
          const zip = new JSZip();

          for(let item of this.items){
            zip.file(item.getFileNameWithExtension(), item.base64, {base64: true});
          }

          zip.generateAsync({type:"blob"})
          .then((blob)=>{
            saveAs(blob, 'test.zip');
          })

        }
      }
    }
</script>
<style lang="scss">
</style>
