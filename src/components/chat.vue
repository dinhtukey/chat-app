<template>
<body>
  <div class="container">
    <h3 class="text-center title"><i class="fa fa-comment-o"></i> DINHTUCHAT</h3>
    <div class="messaging">
      <div class="inbox_msg">
        <div class="inbox_people">
          <div class="headind_srch">
            <div class="recent_heading">
              <h4>Online</h4>
            </div>
            <!-- <div class="srch_bar">
              <div class="stylish-input-group">
                <form @submit.prevent="handleSearch"> 
                    <input v-model="searchName" type="text" class="search-bar" placeholder="Search" />
                    <span class="input-group-addon">
                      <button type="submit">
                        <i class="fa fa-search" aria-hidden="true"></i>
                      </button>
                    </span>
                </form>
              </div>
            </div> -->
          </div>
          <div class="inbox_chat">
            <template v-if="users">
              <template v-for="(user,index) in users">
                <div :key="`${index}`" class="chat_list">
                  <div class="chat_people">
                    <div class="chat_img">
                      <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
                    </div>
                    <div class="chat_ib">
                      <h5>
                        {{user.name}}
                        <span class="chat_date">{{user.date}}</span>
                      </h5>
                      <!-- <p>ID:{{user.id}}</p> -->
                    </div>
                  </div>
                </div>
              </template>
            </template>
            <div class="ib_button">
              <button class="btn button_left"><i style="color:#d5bfbf;" class="fa fa-angle-left"></i></button>
            </div>
          </div>
        </div>
        <div class="mesgs">
          <div id="msg_history">
            <!-- <div v-html="messagesRecive"></div>
            <div v-html="messagesSend"></div> -->
          </div>
          <div class="type_msg">
            <form @submit.prevent="handleSubmit">
              <div class="input_msg_write">
                <input
                  v-model="text"
                  type="text"
                  autocomplete="off"
                  autofocus="true"
                  placeholder="Type a message"
                />
                <!-- <input class="msg_send_btn" type="submit" value="submit" /> -->

                <button name="submit" class="btn msg_send_btn btn-circle" type="submit"><i class="fa fa-paper-plane"
                    aria-hidden="true"></i></button>
                <button
                  v-on:click="sendLocation"
                  class="btn btn-primary location "
                  type="button"
                >
                  <i class="fa fa-street-view"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="clear"></div>
      </div>

      <p class="text-center top_spac">
        Design by
        <a target="_blank" href="https://www.facebook.com/dinhtutran.99/">DINH TU</a>
      </p>
    </div>
  </div>  
</body>
  
</template>

<script>
import io from "socket.io-client";
import moment from 'moment';
export default {
  data() {
    return {
      socket: io("https://dinhtuchat-api.herokuapp.com"),
      users: [],
      messagesRecive: "",
      messagesSend: "",
      name: this.$route.query.name,
      room: this.$route.query.room,
      text: "",
      searchName:"",
    };
  },
  methods: {
    // getParam(name){
    //   const urlParams = new URLSearchParams(window.location.search);

    //   //console.log(urlParams.get('room'))
    //   return urlParams.get(name)
    // },
    joinServer() {
      this.socket.on("connect", () => {
        console.log("client connected to server");
        this.socket.emit("INFO_FROM_CLIENT_TO_SERVER", {
          name: this.name,
          room: this.room
        });
      });
    },

    listUser() {
      this.socket.on("USER_LIST", msg => {
        this.users = msg.users.map(item => {
          let newOject = { ...item };
          newOject.date = moment(newOject.date).format("LT") + " "+ moment(newOject.date).format("L")
           return newOject;
        })
        //this.users = msg.users;
      });
    },
    reponseServer() {
      this.socket.on("FROM_SERVER_TO_CLIENT", msg => {
        msg.createdAt = moment(msg.createdAt).format("LT") + " "+ moment(msg.createdAt).format("L");
        const messageReceived = `<div class="incoming_msg">
          <div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil">
          </div>
          <div class="received_msg">
            <div class="received_withd_msg">
              <p>${msg.text}</p>
              <span class="time_date"> ${msg.createdAt} | <strong>${msg.from}</strong></span>
            </div>
          </div>
        </div>`;
        document.getElementById("msg_history").innerHTML+=messageReceived;
        document.getElementById("msg_history").scrollTop = document.getElementById("msg_history").scrollHeight;
      });
    },

    reponseServerLocation(){
      this.socket.on("LOCATION_FROM_SERVER_TO_CLIENT", msg => {
        const url = `https://www.google.com/maps?q=${msg.lat},${msg.lng}`
        msg.createdAt = moment(msg.createdAt).format("LT") + " "+ moment(msg.createdAt).format("L");
        const messageReceived = `<div class="incoming_msg">
                                  <div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil">
                                </div>
                                <div class="received_msg">
                                   <div class="received_withd_msg">
                                  <p><a target="_blank" href="${url}">vị trí của tôi</a></p>
                                  <span class="time_date"> ${msg.createdAt} | <strong>${msg.from}</strong></span>
                                </div>
                                </div>
                                </div>
                                <div class="clear"></div>`;
        document.getElementById("msg_history").innerHTML+=messageReceived;
        document.getElementById("msg_history").scrollTop = document.getElementById("msg_history").scrollHeight;
      });
    },

    handleSubmit() {
      if(this.text){
        const data = {
        text: this.text,
        from: this.name,
        createdAt: new Date()
      };
      const dataSend = {
        from: "You",
        text: data.text,
        createdAt: new Date()
      };
      dataSend.createdAt = moment(dataSend.createdAt).format("LT") + " "+ moment(dataSend.createdAt).format("L");
      const messagesSended = `<div class="outgoing_msg">
                <div class="sent_msg">
                <p>${dataSend.text}</p>
                  <span class="time_date"> ${dataSend.createdAt} | <strong>${dataSend.from}</strong></span>
                </div>
              </div>
              <div class="clear"></div>`;
      this.socket.emit("FROM_CLIENT_TO_SERVER", data);
      document.getElementById("msg_history").innerHTML+=messagesSended
      this.text = '';
      document.getElementById("msg_history").scrollTop = document.getElementById("msg_history").scrollHeight;
      }
      
    },
    sendLocation(){
      if(!navigator.geolocation) return alert("Trình duyệt của bạn không hỗ trợ")
      navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const data = {
        from: this.name,
        lat: lat,
        lng: lng,
        createdAt: new Date(),
      };
      const url = `https://www.google.com/maps?q=${data.lat},${data.lng}`
      const locationSent = `<div class="outgoing_msg">
      <div class="sent_msg">
      <p><a target="_blank" href="${url}">vị trí của tôi</a></p>
      <span class="time_date"> ${moment(data.createdAt).format('LT') + " "+ moment(data.createdAt).format("L")} | <strong>You</strong></span>
      </div>
      </div>
      <div class="clear"></div>`
      document.getElementById("msg_history").innerHTML+=locationSent
      this.socket.emit('LOCATION_FROM_CLIENT_TO_SERVER', data);
      document.getElementById("msg_history").scrollTop = document.getElementById("msg_history").scrollHeight;
      })
    },

    // handleSearch(){
    //   if(this.searchName){
    //     const data = {
    //       name: this.searchName
    //     }
    //     this.socket.emit('FROM_CLIENT_TO_SERVER_SEARCH_USER', data);
    //   }else{
    //     this.listUser()
    //   }
    // }
  },
  mounted() {
    this.joinServer();
    this.listUser();
    this.reponseServer();
    this.reponseServerLocation();
  }
};
</script>

<style scoped>
  @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css");
  @import url("../assets/css/chat/chat.css");
</style>