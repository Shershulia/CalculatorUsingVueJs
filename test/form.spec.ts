import { mount } from "@vue/test-utils";
import ContactView from "../src/views/ContactView.vue";
import { describe, it, expect } from "vitest";

describe("Calculator.vue", () => {

  it("Form sends successfully", () => {
    const wrapper = mount(ContactView,{});
    wrapper.vm.comment.category = "bag";
    wrapper.vm.comment.name = "Ivan";
    wrapper.vm.comment.mail = "example@mail.com";
    wrapper.vm.comment.description = "Something went wrong";

    wrapper.vm.sendForm();
    expect(wrapper.vm.form_status).toBe("Success");
  });


});

