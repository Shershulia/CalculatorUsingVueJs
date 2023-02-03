import { mount } from "@vue/test-utils";
import CalculatorView from "../src/views/CalculatorView.vue";
import { describe, it, expect } from "vitest";

describe("Calculator.vue", () => {

  it("Addition works how it should", () => {
    const wrapper = mount(CalculatorView,{});
    wrapper.vm.first = "1";
    wrapper.vm.operation = "+";
    wrapper.vm.second = "2";
    wrapper.vm.solve();
    expect(wrapper.vm.first).toBe("3.000");
    expect(wrapper.vm.logs).toEqual(["1+2=3.000\n"]);
  });
  it("Clear all", () => {
    const wrapper = mount(CalculatorView,{});
    wrapper.vm.first = "1";
    wrapper.vm.operation = "+";
    wrapper.vm.second = "2";
    wrapper.vm.clearAll();
    expect(wrapper.vm.first).toBe("");
    expect(wrapper.vm.second).toBe("");
    expect(wrapper.vm.operation).toBe("");
  });
  it("Delete last", () => {
    const wrapper = mount(CalculatorView,{});
    wrapper.vm.first = "1.034";
    wrapper.vm.deleteLast();
    expect(wrapper.vm.first).toBe("1.03");
  });
  it("Add last comma first", () => {
    const wrapper = mount(CalculatorView,{});
    wrapper.vm.first = "1.034";
    wrapper.vm.operation = "+";
    wrapper.vm.second = "";
    wrapper.vm.addLast(".");
    expect(wrapper.vm.second).toBe("0.");
  });

});
describe("Calculator.vue Fail Handling", () => {

  it("Cannot divide on 0", () => {
    const wrapper = mount(CalculatorView,{});
    wrapper.vm.first = "1";
    wrapper.vm.operation = "/";
    wrapper.vm.second = "0";
    wrapper.vm.solve();
    expect(wrapper.vm.error).toBe("You cannot divide on zero Choose another option")
  });
  it("Solve without operation", () => {
    const wrapper = mount(CalculatorView,{});
    wrapper.vm.first = "1";
    wrapper.vm.solve();
    expect(wrapper.vm.error).toBe("You should input operation")
  });
  it("Solve without second number", () => {
    const wrapper = mount(CalculatorView,{});
    wrapper.vm.first = "1";
    wrapper.vm.operation = "+";
    wrapper.vm.solve();
    expect(wrapper.vm.error).toBe("Second number is empty")
  });
  it("Double commas", () => {
    const wrapper = mount(CalculatorView,{});
    wrapper.vm.first = "1.";
    wrapper.vm.addLast(".")
    expect(wrapper.vm.error).toBe("You cannot have two commas")
  });

});