import { Customer } from "./Customer";

export class SearchResponse{
    page_count:number;
    page_customers_count:number;
    per_page:number;
    total_count:number;
    page_customers:Customer[];
}