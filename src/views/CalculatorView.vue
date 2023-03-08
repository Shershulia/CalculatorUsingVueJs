<template>
  <body>
    <div class="grid_container">
      <text
        v-if="operation === ''"
        v-text="first"
        class="calculation_field"
      ></text>
      <text
        v-else-if="operation !== ''"
        v-text="second"
        class="calculation_field"
      ></text>

      <button type="button" id="but" v-on:click="clearAll">C</button>
      <button type="button" id="but" v-on:click="solve">ANS</button>
      <button type="button" id="but" v-on:click="deleteLast">DEL</button>
      <button type="button" id="but" v-on:click="operation = '+'">+</button>
      <button type="button" id="but" v-on:click="addLast('1')">1</button>
      <button type="button" id="but" v-on:click="addLast('2')">2</button>
      <button type="button" id="but" v-on:click="addLast('3')">3</button>
      <button type="button" id="but" v-on:click="operation = '*'">*</button>
      <button type="button" id="but" v-on:click="addLast('4')">4</button>
      <button type="button" id="but" v-on:click="addLast('5')">5</button>
      <button type="button" id="but" v-on:click="addLast('6')">6</button>
      <button type="button" id="but" v-on:click="operation = '-'">-</button>
      <button type="button" id="but" v-on:click="addLast('7')">7</button>
      <button type="button" id="but" v-on:click="addLast('8')">8</button>
      <button type="button" id="but" v-on:click="addLast('9')">9</button>
      <button type="button" id="but" v-on:click="operation = '/'">/</button>
      <button type="button" id="but"></button>
      <button type="button" id="but" v-on:click="addLast('0')">0</button>
      <button type="button" id="but" v-on:click="addLast('.')">.</button>
      <button type="button" id="but" v-on:click="solve">=</button>
      <div class="logs">
        Logs for this operation<br />
        <li v-for="log in logs" :key="log">
          {{ log }}
        </li>
      </div>

      <div class="logs">
        History<br />
        <li v-for="hist in history" :key="hist">
          {{ hist }}
        </li>
      </div>
      <text id="error" v-text="error"></text>
    </div>
  </body>
</template>

<script>
import axios from "axios";

export default {
  name: "CalculatorView",
  data() {
    return {
      first: "",
      second: "",
      operation: "",
      logs: [],
      history: [],
      error: "",
    };
  },
  created() {
    axios
      .get("http://localhost:8081/calculations", {
        headers: { Authorization: "Basic aXZhbnNoOmFkbWlu" },
      })
      .then((response) => {
        const data = response.data;
        data.forEach((item) => {
          let toHistory =
            item.firstComponent +
            item.operation +
            item.secondComponent +
            "=" +
            item.result +
            "\n";
          if (this.history) {
            this.history.push(toHistory);
          } else {
            this.history = [toHistory];
          }
          console.log(toHistory);
        });
      });
  },
  methods: {
    addLast(p1) {
      if (this.operation === "") {
        if (p1 === ".") {
          if (this.first === "") this.first += "0";
          if (this.first.includes(".")) {
            this.error = "You cannot have two commas";
            return;
          }
        }
        this.first += p1;
      } else {
        if (p1 === ".") {
          if (this.second === "") this.second += "0";
          if (this.second.includes(".")) {
            this.error = "You cannot have two commas";
            return;
          }
        }
        this.second += p1;
      }
    },
    clearAll() {
      this.first = "";
      this.second = "";
      this.operation = "";
    },
    getLastFromApi() {
      axios
        .get("http://localhost:8081/calculations", {
          headers: { Authorization: "Basic aXZhbnNoOmFkbWlu" },
        })
        .then((response) => {
          let lastItem = response.data[response.data.length - 1];
          let toLog =
            lastItem.firstComponent +
            lastItem.operation +
            lastItem.secondComponent +
            "=" +
            lastItem.result +
            "\n";
          this.logs.push(toLog);
        });
    },
    solve() {
      if (this.first === "") {
        this.error = "First number is empty";
      } else if (this.operation === "") {
        this.error = "You should input operation";
      } else if (this.second === "") {
        this.error = "Second number is empty";
      } else if (this.operation === "/" && this.second === "0") {
        this.error = "You cannot divide on zero Choose another option";
        this.second = "";
      } else {
        let x = eval(this.first + this.operation + this.second).toFixed(3);

        const postData = {
          firstComponent: this.first,
          secondComponent: this.second,
          operation: this.operation,
          result: x,
        };

        let axiosConfig = {
          headers: { Authorization: "Basic aXZhbnNoOmFkbWlu" },
        };

        axios
          .post("http://localhost:8081/calculations", postData, axiosConfig)
          .then((res) => {
            console.log("RESPONSE RECEIVED: ", res);
          })
          .catch((err) => {
            console.log("AXIOS ERROR: ", err);
          });

        this.getLastFromApi();
        this.first = x;
        this.second = "";
        this.operation = "";
      }
    },
    deleteLast() {
      if (this.operation === "") {
        this.first = this.first.slice(0, -1);
      } else {
        this.second = this.second.slice(0, -1);
      }
    },
  },
};
</script>
<style scoped>
.grid_container {
  width: 430px;
  display: grid;
  grid-template-columns: 100px 100px 100px 100px;
  grid-template-rows: 100px auto auto auto auto auto 100px;
  gap: 10px;
  padding: 10px;
  margin: auto;
  border: 3px solid green;
}

#but {
  cursor: pointer;
  outline: none;
  border: none;
  background-color: #232423;
  padding: 0.3em 1.2em;
  font-size: 1.3rem;
  font-weight: 550;
  color: #ffffff;
  background-size: 100% 100%;
}

#but:hover {
  background-color: #2c3e50;
}

.calculation_field {
  height: 60px;
  white-space: nowrap;
  overflow: auto;
  margin: auto;
  width: 400px;
  border-style: solid;
  grid-column-start: 1;
  grid-column-end: 5;
  text-align: center;
  font-size: 2rem;
  border-width: 5px;
  max-height: 70px;
}

.logs {
  grid-column-start: 1;
  grid-column-end: 5;
  border: solid;
  padding: 5px;
  overflow: auto;
}
#error {
  width: 400px;
}
</style>
