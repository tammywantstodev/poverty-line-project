import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { useState } from "react";

describe("Email Input Component", () => {
  // Test component to simulate state changes
  const TestEmailInput = () => {
    const [email, setEmail] = useState("");
    return (
      <div>
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
    );
  };

  it("renders the label and input correctly", () => {
    render(<TestEmailInput />);
    
    // Check if the label is present
    expect(screen.getByLabelText("Email address")).toBeInTheDocument();
    
    // Check if the input has correct attributes
    const input = screen.getByRole("textbox", { name: "Email address" });
    expect(input).toHaveAttribute("type", "email");
    expect(input).toHaveAttribute("name", "email");
    expect(input).toHaveAttribute("autocomplete", "email");
    expect(input).toBeRequired();
    expect(input).toHaveClass("input-field");
  });

  it("updates the input value on change", () => {
    render(<TestEmailInput />);
    const input = screen.getByRole("textbox", { name: "Email address" });
    
    // Simulate typing into the input
    fireEvent.change(input, { target: { value: "test@example.com" } });
    
    // Verify the value updates
    expect(input).toHaveValue("test@example.com");
  });
});