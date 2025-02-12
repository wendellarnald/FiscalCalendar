package main

import (
    "encoding/json"
    "log"
    "net/http"
    "time"
    "github.com/gorilla/mux"
    "github.com/rs/cors"
)

type FiscalDate struct {
    ID          string    `json:"id"`
    Date        time.Time `json:"date"`
    Title       string    `json:"title"`
    Description string    `json:"description"`
    Category    string    `json:"category"`
}

var fiscalDates = []FiscalDate{
    {
        ID:          "1",
        Date:        time.Date(2024, 2, 10, 0, 0, 0, 0, time.UTC),
        Title:       "IRS - Declaração Mensal de Remunerações",
        Description: "Entrega da Declaração Mensal de Remunerações",
        Category:    "IRS",
    },
    // Add more dates here
}

func getFiscalDates(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(fiscalDates)
}

func main() {
    r := mux.NewRouter()
    
    r.HandleFunc("/api/fiscal-dates", getFiscalDates).Methods("GET")
    
    c := cors.New(cors.Options{
        AllowedOrigins: []string{"http://localhost:3000"},
        AllowedMethods: []string{"GET"},
    })
    
    handler := c.Handler(r)
    
    log.Println("Server starting on port 8080...")
    log.Fatal(http.ListenAndServe(":8080", handler))
}