import { mount } from "@vue/test-utils";
import ContactView from "../views/ContactView.vue";
import { describe, it, expect } from "vitest";
import { createStore } from "../store";


function mountEventList(config = {}) {
  config.mountOptions = config.mountOptions || {}
  config.plugins = config.plugins || {}
  return mount(ContactView, {
    global: {
      plugins: [
        createStore(config.plugins.store),
      ]
    },
    ...config.mountOptions
  })
}
describe("Calculator.vue", () => {

  it("Form loads successfully", () => {
    const wrapper = mountEventList();
    expect(wrapper.exists()).toBeTruthy()
  });

  it("Loads with button names",() => {
    const wrapper = mountEventList();
    const title = wrapper.find("#submit_button");
    expect(title.exists()).toBeTruthy();
    expect(title.text()).toContain("Submit")
  });

  it("Form is valid",() => {
    const wrapper = mountEventList({
      plugins: {
        store: {
          state: () => ({
            name: "Ivan",
            email: "example@mail.ru",
            description:"123456",
            category: "bag"
          })
        }
      }
    })
    wrapper.vm.sendForm();
    expect(wrapper.vm.v$.comment.mail.$error).toBe(false);
    expect(wrapper.vm.v$.comment.name.$error).toBe(false);
    expect(wrapper.vm.v$.comment.category.$error).toBe(false);
  });
  it("Form is invalid due description",() => {
    const wrapper = mountEventList({
      plugins: {
        store: {
          state: () => ({
            name: "Ivan",
            email: "example@mail.ru",
            description:"12345", //less then 6 symbols
            category: "bag"
          })
        }
      }
    })
    wrapper.vm.sendForm();
    expect(wrapper.vm.v$.comment.mail.$error).toBe(false);
    expect(wrapper.vm.v$.comment.name.$error).toBe(false);
    expect(wrapper.vm.v$.comment.category.$error).toBe(false);
    expect(wrapper.vm.v$.comment.description.$error).toBe(true);

  });
  it("Form is invalid due to name",() => {
    const wrapper = mountEventList({
      plugins: {
        store: {
          state: () => ({
            name: "666",
            email: "example@mail.ru",
            description:"123456",
            category: "bag"
          })
        }
      }
    })
    wrapper.vm.sendForm();
    expect(wrapper.vm.v$.comment.mail.$error).toBe(false);
    expect(wrapper.vm.v$.comment.name.$error).toBe(true);
    expect(wrapper.vm.v$.comment.category.$error).toBe(false);
    expect(wrapper.vm.v$.comment.description.$error).toBe(false);

  });
  it("Form is invalid due to mail",() => {
    const wrapper = mountEventList({
      plugins: {
        store: {
          state: () => ({
            name: "Ivan",
            email: "example",
            description:"123456",
            category: "bag"
          })
        }
      }
    })
    wrapper.vm.sendForm();
    expect(wrapper.vm.v$.comment.mail.$error).toBe(true);
    expect(wrapper.vm.v$.comment.name.$error).toBe(false);
    expect(wrapper.vm.v$.comment.category.$error).toBe(false);
    expect(wrapper.vm.v$.comment.description.$error).toBe(false);

  });
  it("Form is invalid due to category",() => {
    const wrapper = mountEventList({
      plugins: {
        store: {
          state: () => ({
            name: "Ivan",
            email: "example@mail.ru",
            description:"123456",
            category: ""
          })
        }
      }
    })
    wrapper.vm.sendForm();
    expect(wrapper.vm.v$.comment.mail.$error).toBe(false);
    expect(wrapper.vm.v$.comment.name.$error).toBe(false);
    expect(wrapper.vm.v$.comment.category.$error).toBe(true);
    expect(wrapper.vm.v$.comment.description.$error).toBe(false);

  });




});

