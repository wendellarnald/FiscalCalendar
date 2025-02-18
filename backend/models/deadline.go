package models

type Period struct {
    StartMonth     string   `json:"startMonth"`
    EndMonth       string   `json:"endMonth"`
    MonthsIncluded []string `json:"monthsIncluded"`
}

type PaymentDeadline struct {
    Deadline string `json:"deadline"`
    Period   Period `json:"period"`
}

type DeadlineResponse struct {
    PaymentDeadlines []PaymentDeadline `json:"paymentDeadlines"`
}