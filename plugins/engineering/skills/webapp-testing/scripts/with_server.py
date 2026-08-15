#!/usr/bin/env python3
"""Start local servers, wait for them to be ready, run a command, and clean up.

Modified for this marketplace; see ../LICENSE.txt for distribution terms.
"""

import argparse
import socket
import subprocess
import sys
import time


def is_server_ready(port, timeout=30):
    """Wait for a server port to accept connections."""
    start_time = time.time()
    while time.time() - start_time < timeout:
        try:
            with socket.create_connection(("localhost", port), timeout=1):
                return True
        except (socket.error, ConnectionRefusedError):
            time.sleep(0.5)
    return False


def main():
    parser = argparse.ArgumentParser(
        description="Run a command with one or more local servers"
    )
    parser.add_argument(
        "--server", action="append", dest="servers", required=True,
        help="Server command (can be repeated)",
    )
    parser.add_argument(
        "--port", action="append", dest="ports", type=int, required=True,
        help="Port for each server (must match --server count)",
    )
    parser.add_argument(
        "--timeout", type=int, default=30,
        help="Timeout in seconds per server (default: 30)",
    )
    parser.add_argument(
        "command", nargs=argparse.REMAINDER,
        help="Command to run after server(s) are ready",
    )
    args = parser.parse_args()

    if args.command and args.command[0] == "--":
        args.command = args.command[1:]
    if not args.command:
        parser.error("no command specified to run")
    if len(args.servers) != len(args.ports):
        parser.error("the number of --server and --port arguments must match")

    processes = []
    try:
        for index, (command, port) in enumerate(zip(args.servers, args.ports), 1):
            print(f"Starting server {index}/{len(args.servers)}: {command}")
            process = subprocess.Popen(command, shell=True)
            processes.append(process)
            print(f"Waiting for server on port {port}...")
            if not is_server_ready(port, timeout=args.timeout):
                raise RuntimeError(
                    f"Server failed to start on port {port} within {args.timeout}s"
                )
            print(f"Server ready on port {port}")

        print(f"\nAll {len(processes)} server(s) ready")
        print(f"Running: {' '.join(args.command)}\n")
        return subprocess.run(args.command, check=False).returncode
    finally:
        print(f"\nStopping {len(processes)} server(s)...")
        for index, process in enumerate(processes, 1):
            try:
                process.terminate()
                process.wait(timeout=5)
            except subprocess.TimeoutExpired:
                process.kill()
                process.wait()
            print(f"Server {index} stopped")
        print("All servers stopped")


if __name__ == "__main__":
    sys.exit(main())