package main

import (
    "encoding/json"
    "log"
    "net/http"
    "os"

    "github.com/gin-gonic/gin"
    "github.com/gin-contrib/cors"
    "fiscal-calendar/models"  // Add this import
)

func main() {
    r := gin.Default()

    r.Use(cors.Default())

    r.GET("/api/deadlines", func(c *gin.Context) {
        // Read the JSON file (you'll need to create this file)
        data, err := os.ReadFile("data/deadlines.json")
        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read data"})
            return
        }

        var response models.DeadlineResponse
        if err := json.Unmarshal(data, &response); err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse data"})
            return
        }

        c.JSON(http.StatusOK, response)
    })

    log.Fatal(r.Run(":8080"))
}