import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CartItem from "@/components/CartItem";

// mock for useScreenSize
const mockUseScreenSize = vi.fn(() => ({ isMobile: false }));
vi.mock("@/hooks/useScreenSize", () => ({
  useScreenSize: () => mockUseScreenSize()
}));

describe("CartItem", () => {
  const mockItem = {
    id: 1,
    title: "Test Product",
    price: 99.99,
    qty: 2,
    image: "test.jpg",
    category: "Test Category",
    description: "Test Description",
    rating: { rate: 4.5, count: 10 },
  };

  const mockDispatch = vi.fn();
  const mockReducerActions = {
    ADD: "ADD",
    REMOVE: "REMOVE",
    QUANTITY: "QUANTITY",
    SUBMIT: "SUBMIT",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseScreenSize.mockReturnValue({ isMobile: false }); // Reset to desktop view
  });

  const renderCartItem = () => {
    return render(
      <BrowserRouter>
        <CartItem
          item={mockItem}
          cartDispatch={mockDispatch}
          CART_REDUCER_ACTIONS={mockReducerActions}
        />
      </BrowserRouter>
    );
  };

  describe("Desktop View", () => {
    it("renders basic product information", () => {
      renderCartItem();
      
      expect(screen.getByText("Test Product")).toBeInTheDocument();
      expect(screen.getByText("Subtotal:")).toBeInTheDocument();
      expect(screen.getByAltText("Test Product")).toBeInTheDocument();
    });

    it("calculates and displays correct subtotal", () => {
      renderCartItem();
      expect(screen.getByText("US$199.98")).toBeInTheDocument();
    });

    it("handles quantity change", () => {
      renderCartItem();
      
      const select = screen.getByLabelText("Qty:", { exact: false });
      fireEvent.change(select, { target: { value: "5" } });

      expect(mockDispatch).toHaveBeenCalledWith({
        type: "QUANTITY",
        payload: { ...mockItem, qty: 5 },
      });
    });

    it("handles remove item click", () => {
      renderCartItem();
      
      const removeButton = screen.getByText("Remove Item");
      fireEvent.click(removeButton);

      expect(mockDispatch).toHaveBeenCalledWith({
        type: "REMOVE",
        payload: mockItem,
      });
    });
  });

  describe("Mobile View", () => {
    beforeEach(() => {
      mockUseScreenSize.mockReturnValue({ isMobile: true });
    });

    it("shows quantity button and removes desktop controls", () => {
      renderCartItem();
      
      const qtyButton = screen.getByText(`Qty: ${mockItem.qty}`);
      const desktopSelect = screen.queryByLabelText("Qty:");
      
      expect(qtyButton).toBeInTheDocument();
      expect(desktopSelect).not.toBeInTheDocument();
    });

    it("opens quantity drawer on click", () => {
      renderCartItem();
      
      const qtyButton = screen.getByText(`Qty: ${mockItem.qty}`);
      fireEvent.click(qtyButton);

      const quantityOptions = screen.getAllByRole("button")
        .filter(button => !isNaN(Number(button.textContent)));
      
      expect(quantityOptions.length).toBeGreaterThan(0);
    });

    it("updates quantity when selecting from drawer", async () => {
      renderCartItem();
      
      const qtyButton = screen.getByText(`Qty: ${mockItem.qty}`);
      fireEvent.click(qtyButton);

      const newQtyButton = screen.getByRole("button", { name: "5" });
      fireEvent.click(newQtyButton);

      expect(mockDispatch).toHaveBeenCalledWith({
        type: "QUANTITY",
        payload: { ...mockItem, qty: 5 },
      });
    });
  });
});