<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="container container-background">
    <div class="row custom-style">
      <div class="col-lg-4 col-md-6 col-sm-12">
        <div class="card">
          <img
            class="card-img-top"
            src="https://thumbs.dreamstime.com/b/man-profile-cartoon-smiling-vector-illustration-graphic-design-135443492.jpg"
            alt="Your Name"
          />
          <div class="card-body">
            <h5 class="card-title">Diar Fonda</h5>
            <p class="card-text">Front End Developer llegende</p>
          </div>
        </div>
      </div>
      <div class="col-lg-8 col-md-6 col-sm-12">
        <h2>Main Skills</h2>
        <ul>
          <li>HTML</li>
          <li>CSS</li>
          <li>JAVASCRIPT</li>
        </ul>
      </div>
      <div class="col-lg-16 col-md-6 col-sm-12 view view-first">
        <img
          src="https://thumbs.dreamstime.com/b/man-profile-cartoon-smiling-vector-illustration-graphic-design-135443492.jpg"
        />
        <div class="mask">
          <h2>Students Component</h2>
          <p>
            Sortable, editable, pagination, search, add a student, delete a
            student and many more functions
          </p>
          <RouterLink to="/students" class="info">Read More</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin-top: 50px;
  padding: 20px;
  min-height: 350px;
}

.container-background {
  background: linear-gradient(
    90deg,
    rgba(192, 192, 192, 1) 35%,
    rgb(83, 74, 74) 79%
  );
}

.card-img-top {
  opacity: 0.5;
  transition: opacity 0.3s ease-in-out;
}
.card-img-top:hover {
  opacity: 1;
}

.view {
  width: 300px;
  height: 200px;
  margin: 10px;
  float: left;
  border: 10px solid #fff;
  overflow: hidden;
  position: relative;
  text-align: center;
  box-shadow: 1px 1px 2px #e6e6e6;
  cursor: default;
  background: #fff url(../images/bgimg.jpg) no-repeat center center;
}
.view .mask,
.view .content {
  width: 300px;
  height: 200px;
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
}
.view img {
  display: block;
  position: relative;
}
.view h2 {
  text-transform: uppercase;
  color: #fff;
  text-align: center;
  position: relative;
  font-size: 17px;
  padding: 10px;
  background: rgba(0, 0, 0, 0.8);
  margin: 20px 0 0 0;
}
.view p {
  font-family: Georgia, serif;
  font-style: italic;
  font-size: 12px;
  position: relative;
  color: #fff;
  padding: 10px 20px 20px;
  text-align: center;
}
.view a.info {
  display: inline-block;
  text-decoration: none;
  padding: 7px 14px;
  background: #000;
  color: #fff;
  text-transform: uppercase;
  box-shadow: 0 0 1px #000;
}
.view a.info:hover {
  box-shadow: 0 0 5px #000;
}

.view-eighth .mask {
  background-color: rgba(255, 255, 255, 0.7);
  top: -200px;
  opacity: 0;
  transition: all 0.3s ease-out 0.5s;
}
.view-eighth h2 {
  transform: translateY(-200px);
  transition: all 0.2s ease-in-out 0.1s;
}
.view-eighth p {
  color: #333;
  transform: translateY(-200px);
  transition: all 0.2s ease-in-out 0.2s;
}
.view-eighth a.info {
  transform: translateY(-200px);
  transition: all 0.2s ease-in-out 0.3s;
}

.view-eighth:hover .mask {
  opacity: 1;
  top: 0px;
  transition-delay: 0s;
  animation: bounceY 0.9s linear;
}
.view-eighth:hover h2 {
  transform: translateY(0px);
  transition-delay: 0.4s;
}
.view-eighth:hover p {
  transform: translateY(0px);
  transition-delay: 0.2s;
}
.view-eighth:hover a.info {
  transform: translateY(0px);
  transition-delay: 0s;
}

@keyframes bounceY {
  0% {
    transform: translateY(-205px);
  }
  40% {
    transform: translateY(-100px);
  }
  65% {
    transform: translateY(-52px);
  }
  82% {
    transform: translateY(-25px);
  }
  92% {
    transform: translateY(-12px);
  }
  55%,
  75%,
  87%,
  97%,
  100% {
    transform: translateY(0px);
  }
}
</style>
