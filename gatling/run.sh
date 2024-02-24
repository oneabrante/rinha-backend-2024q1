#!/bin/bash

RESULTS_WORKSPACE="/home/abrantedevops/gatling_testes_rinha_backend/gatling-charts-highcharts-bundle-3.10.4/user-files/results"
GATLING_BIN_DIR="/home/abrantedevops/gatling_testes_rinha_backend/gatling-charts-highcharts-bundle-3.10.4/bin"
GATLING_WORKSPACE="/home/abrantedevops/gatling_testes_rinha_backend/gatling-charts-highcharts-bundle-3.10.4/user-files/"

runGatling() {
    sh $GATLING_BIN_DIR/gatling.sh -rm local -s RinhaBackendCrebitosSimulation \
        -rd "Rinha de Backend - 2024/Q1: Crébito" \
        -rf $RESULTS_WORKSPACE \
        -sf "$GATLING_WORKSPACE/simulations"
}

init() {
    for i in {1..20}; do
        curl --fail http://localhost:3000/clientes/1/extrato && \
        echo "" && \
        curl --fail http://localhost:3000/clientes/1/extrato && \
        echo "" && \
        runGatling && \
        break || sleep 2;
    done
}

init