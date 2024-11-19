import { rest } from "msw";
import { server } from "../mocks/server";
import NyTimesDashboard from "./NyTimesDashboard";
import { screen, render } from "@testing-library/react";

test("test for mock api", async () => {
    render(<NyTimesDashboard />);
    const element = await screen.findByRole("listitem");
    expect(element).toBeInTheDocument();
})